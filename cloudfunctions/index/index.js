// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("event",event.info)
  console.log("context",context)
  ads = []
  switch (event.action) {
    case '1': {
      return add(event)
    }
    case '2': {
      return multiply(event)
    }
}
// await db.collection('advertise').limit(8).get().then(res=>{
//   ads = res.data
// })
//   return ads
}


async function add(event) {
  // db.collection('search_salary').add({
  //   data:{
  //     info: event.info
  //   }
  // })
}

async function multiply(event) {
    ads = []
    await db.collection('advertise').limit(8).get().then(res=>{
    ads = res.data
  })
  return ads
}