// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.funcName) {
    case "querySalary":
      return querySalary(event)
    case "queryCommunity":
      return queryCommunity(event)
    default:
      console.log("wrong funcName")
      return
  }
}

async function querySalary(event) {

  let salaries = []

  let keys = new Set((event.key || "").split('+'))
  let regexp = ".*("
  for (key of keys) {
    regexp += key.trim() + '|'
  }
  regexp = regexp.slice(0, -1)
  regexp += ").*"

  let temp = db.collection('salary')
  switch (keys.size) {
    case 0:
      break
    case 1:
      temp = await temp.where(_.or([{
        "info.city": db.RegExp({
          regexp: regexp,
          options: 'i'
        })
      }, {
        "info.company": db.RegExp({
          regexp: regexp,
          options: 'i'
        })
      }, {
        "info.job": db.RegExp({
          regexp: regexp,
          options: 'i'
        })
      }]))
      break
    case 2:
      temp = await temp.where(_.or([
        _.and([{
          "info.city": db.RegExp({
            regexp: regexp,
            options: 'i'
          })
        }, {
          "info.company": db.RegExp({
            regexp: regexp,
            options: 'i'
          })
        }]),
        _.and([{
          "info.city": db.RegExp({
            regexp: regexp,
            options: 'i'
          })
        }, {
          "info.job": db.RegExp({
            regexp: regexp,
            options: 'i'
          })
        }]),
        _.and([{
          "info.job": db.RegExp({
            regexp: regexp,
            options: 'i'
          })
        }, {
          "info.company": db.RegExp({
            regexp: regexp,
            options: 'i'
          })
        }])
      ]))
      break
    default:
      temp = await temp.where(_.and([{
        "info.city": db.RegExp({
          regexp: regexp,
          options: 'i'
        })
      }, {
        "info.company": db.RegExp({
          regexp: regexp,
          options: 'i'
        })
      }, {
        "info.job": db.RegExp({
          regexp: regexp,
          options: 'i'
        })
      }]))
  }

  await temp.orderBy("info.time", "desc").skip(event.from).limit(event.length).field({
    openid: true,
    info: true
  }).get().then(res => {
    salaries = res.data
  })

  return salaries


}

async function queryCommunity(event) {
  let communities = []

  if (event.random) {
    await db.collection('community').aggregate().sample({
      size: event.length
    }).end().then(res => {
      communities = res.list
    })
  } else {
    let keys = new Set((event.key || "").split('+'))
    let regexp = ".*("
    for (key of keys) {
      regexp += key.trim() + '|'
    }
    regexp = regexp.slice(0, -1)
    regexp += ").*"

    await await db.collection('community').where(_.or([{
      "info.title": db.RegExp({
        regexp: regexp,
        options: 'i'
      })
    }, {
      "info.content": db.RegExp({
        regexp: regexp,
        options: 'i'
      })
    }])).orderBy("info.time", "desc").skip(event.from).limit(event.length).field({
      openid: true,
      info: true
    }).get().then(res => {
      communities = res.data
    })
  }
  return communities

}