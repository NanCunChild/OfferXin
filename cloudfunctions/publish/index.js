// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  // 异步，没加 await
  db.collection('check_salary').add({
    data:{
      openid: wxContext.OPENID,
      info: event.info
    }
  }).then(res=>{
    let temp = db.collection('user').doc(wxContext.OPENID)
    temp.get().then(x => {
      temp.update({
        data: {
          publishSalaries: _.push(res._id)
        }
      })
    }, x => {
      db.collection('user').add({
        data: {
          _id: wxContext.OPENID,
          publishSalaries: [res._id]
        }
      })
    })
  })
}