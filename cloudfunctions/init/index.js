// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  let info
  await db.collection('user').doc(cloud.getWXContext().OPENID).field({
    nickname: true,
    avator: true
  }).get().then(res => {
    info = res.data
  })

  return info
}