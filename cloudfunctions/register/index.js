// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let temp = db.collection('user').doc(wxContext.OPENID)

  temp.get().then(res => {
      console.log(event)
      temp.update({
        data: {
          nickname: event.nickname,
          avator: event.avator
        }
      })
    }, res => {
      db.collection('user').add({
        data: {
          _id: wxContext.OPENID,
          nickname: event.nickname,
          avator: event.avator
        }
      })
    }


  )
}