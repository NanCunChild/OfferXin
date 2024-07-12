// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.funcName) {
    case "publishSalary":
      return publishSalary(event)
    case "publishCommunity":
      return publishCommunity(event)
    case "collectSalary":
      return collectSalary(event)
    case "collectRecruitment":
      return collectRecruitment(event)
    default:
      console.log("wrong funcName")
      return
  }
}

async function publishSalary(event) {

  let ids = []
  let salaries = []

  await db.collection('user').doc(cloud.getWXContext().OPENID).get().then(res => {
    ids = res.data.publishSalaries || []
  }, res=>{})
  if(ids.length == 0) return []

  await db.collection('salary').where({
    _id: _.in(ids)
  }).orderBy("info.time", "desc").skip(event.from).limit(event.length).field({
    openid: true,
    info: true
  }).get().then(res => {
    salaries = res.data
  })

  return salaries
}

async function publishCommunity(event) {
  let ids = []
  let communities = []
  await db.collection('user').doc(cloud.getWXContext().OPENID).get().then(res => {
    ids = res.data.publishCommunities || []
  }, res=>{})
  if(ids.length == 0) return []


  await db.collection('community').where({
    _id: _.in(ids)
  }).orderBy("info.time", "desc").skip(event.from).limit(event.length).field({
    openid: true,
    info: true
  }).get().then(res => {
    communities = res.data
  })

  return communities

}

async function collectSalary(event) {

  let ids = []
  let salaries = []

  await db.collection('user').doc(cloud.getWXContext().OPENID).get().then(res => {
    ids = res.data.collectSalaries || []
  }, res=>{})
  if(ids.length == 0) return []

  await db.collection('salary').where({
    _id: _.in(ids)
  }).orderBy("info.time", "desc").skip(event.from).limit(event.length).field({
    openid: true,
    info: true
  }).get().then(res => {
    salaries = res.data
  })

  return salaries
}

async function collectRecruitment(event) {
  const res = await db.collection('user').doc(cloud.getWXContext().OPENID).get()
  return res.data.collectRecruitments || []
}