// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
	switch (event.funcName) {
		case 'querySalary':
			return querySalary(event)
		case 'queryRecruitment':
			return queryRecruitment(event)
		default:
			console.log('wrong funcName')
			return
	}
}

// 搜索逻辑
// 搜索逻辑
async function querySalary(event) {
  const { recruitment_target, time, education, key, from, length } = event;
  console.log('querySalary', recruitment_target, time, education, key);

  // 添加搜索信息，便于后续使用
  db.collection('search_salary').add({
    data: {
      info: key
    }
  });

  // 处理关键字，去除重复和空白字符
  let keys = Array.from(new Set((key || '').split(/\s+/).filter(Boolean)));
  let queries = keys.map(k => {
    return _.or([
      { 'info.city': db.RegExp({ regexp: `.*${k}.*`, options: 'i' }) },
      { 'info.company': db.RegExp({ regexp: `.*${k}.*`, options: 'i' }) },
      { 'info.job': db.RegExp({ regexp: `.*${k}.*`, options: 'i' }) }
    ]);
  });

  // 合并查询条件
  let combinedQuery = _.and(queries);
  let tempQuery = [
    combinedQuery,
    { 'info.time': db.RegExp({ regexp: `.*${time}.*`, options: 'i' }) },
    { 'info.education': db.RegExp({ regexp: `.*${education}.*`, options: 'i' }) }
  ];

  if (recruitment_target) {
    tempQuery.push({ 'info.type': recruitment_target });
  }

  let temp = db.collection('salary').where(_.and(tempQuery));

  // 输出生成的查询条件
  console.log('生成的查询条件:', JSON.stringify(_.and(tempQuery), null, 2));

  let salaries = [];
  await temp
    .skip(from)
    .limit(length)
    .field({ openid: true, info: true })
    .orderBy('info.time', 'desc')
    .get()
    .then(res => {
      salaries = res.data;
    })
    .catch(e => {
      console.error('Error fetching salaries:', e);
      salaries = [];
    });

  console.log('返回的薪资列表：', salaries);
  return salaries;
}










async function queryRecruitment(event) {
	console.log('queryRecruitment', event)
	let recruitments = []

	let keys = new Set((event.key || '').split(' '))
	let regexp = '.*('
	for (key of keys) {
		regexp += key.trim() + '|'
	}
	regexp = regexp.slice(0, -1)
	regexp += ').*'

	let temp = db.collection('RecruitmentsSet')
	switch (keys.size) {
		case 0:
			break
		case 1:
			temp = await temp.where(
				_.or([
					{
						recruitment_name: db.RegExp({
							regexp: '.*' + event.key + '.*',
							options: 'i'
						})
					},
					{
						company_name: db.RegExp({
							regexp: '.*' + event.key + '.*',
							options: 'i'
						})
					}
				])
			)
			break
		case 2:
			temp = await temp.where(
				_.and([
					{
						recruitment_name: db.RegExp({
							regexp: '.*' + event.key + '.*',
							options: 'i'
						})
					},
					{
						company_name: db.RegExp({
							regexp: '.*' + event.key + '.*',
							options: 'i'
						})
					}
				])
			)
			break
		default:
			temp = await temp.where(
				_.or([
					{
						recruitment_name: db.RegExp({
							regexp: '.*' + event.key + '.*',
							options: 'i'
						})
					},
					{
						company_name: db.RegExp({
							regexp: '.*' + event.key + '.*',
							options: 'i'
						})
					}
				])
			)
	}

	await temp
		.skip(event.from)
		.limit(event.length)
		.get()
		.then(res => {
			recruitments = res.data
		})

	return recruitments
}
