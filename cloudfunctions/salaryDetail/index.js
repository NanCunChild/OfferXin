// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// const wxContext = cloud.getWXContext()
// 不知道为什么，这玩意申明在外面的话，函数里调用 wxContext.OPENID 是 undefine...

// 云函数入口函数
exports.main = async (event, context) => {

  switch (event.funcName) {
    case "init":
      return init(event)
    case "like":
      return like(event)
    case "collectSalary":
      return collectSalary(event)
    case "collectRecruitment":
      return collectRecruitment(event)
    case "comment":
      return comment(event)
    case "likeComment":
      return likeComment(event)
    case "replyComment":
      return replyComment(event)
    default:
      console.log("wrong funcName")
      return
  }
}

async function init(event) {
  let obj
  let salaries

  let temp = db.collection('salary').doc(event._id)

  temp.update({
    data: {
      'info.views': _.inc(1)
    }
  }).then(res => {}, res => {
    temp.update({
      data: {
        'info.views': 1
      }
    })
  })

  await temp.get().then(res => {
    obj = res.data
  })

  await db.collection('user').doc(cloud.getWXContext().OPENID).get().then(res=>{
    obj.info.collect = (res.data.collectSalaries||[]).includes(obj._id) ? true : false
  }, res=>{
    obj.info.collect = false
  })

  await db.collection('salary').where(_.and([{
    _id: _.neq(event._id)
  }, _.or([{
    'info.company': db.RegExp({
      regexp: '.*' + obj.info.company + '.*',
      options: 'i'
    })
  }, {
    'info.city': db.RegExp({
      regexp: '.*' + obj.info.city + '.*',
      options: 'i'
    })
  }, {
    'info.job': db.RegExp({
      regexp: '.*' + obj.info.job + '.*',
      options: 'i'
    })
  }])])).orderBy('info.time', 'desc').limit(event.length).field({
    info: true
  }).get().then(res => {
    salaries = res.data
  })

  return {
    obj: obj,
    salaries: salaries
  }
}
async function like(event) {
  db.collection('salary').doc(event._id).update({
    data: {
      ['info.likes']: _.inc(event.bool ? 1 : -1)
    }
  })
}
async function collectSalary(event) {
  let openid = cloud.getWXContext().OPENID
  db.collection('salary').doc(event._id).update({
    data: {
      ['info.collects']: _.inc(event.bool ? 1 : -1)
    }
  }).then(res => {
    let temp = db.collection('user').doc(openid)
    temp.get().then(x => {
      temp.update({
        data: {
          collectSalaries: (event.bool ? _.push(event._id) : _.pull(event._id))
        }
      })
    }, x => {
      db.collection('user').add({
        data: {
          _id: openid,
          collectSalaries: event.bool ? [event._id] : []
        }
      })
    })
  })

}

async function collectRecruitment(event) {
  let openid = cloud.getWXContext().OPENID
  let temp = db.collection('user').doc(openid)
  const tempRecruitment =  db.collection(event.item.dbName).doc(event.item._id)

  temp.get().then(res => {
    console.log('res.data.collectRecruitments',res.data.collectRecruitments);
    const collectRecruitments = res.data.collectRecruitments
    if(!collectRecruitments || !collectRecruitments.length) {
      temp.update({
        data: {
          collectRecruitments:  [event.item]
        }
      }).then(() => {
        tempRecruitment.update({
          data: {
            ['collects']: _.inc(1)
          }
        })
        return true
      })
    } else if(!collectRecruitments.filter(item => item._id === event.item._id).length) {
      temp.update({
        data: {
          collectRecruitments:  _.push(event.item)
        }
      }).then(() => {
        tempRecruitment.update({
          data: {
            ['collects']: _.inc(1)
          }
        })
      })
      return true
    } else {
      temp.update({
        data: {
          collectRecruitments:  _.pull({
            _id: _.eq(event.item._id),
          })
        }
      }).then(() => {
        tempRecruitment.update({
          data: {
            ['collects']: _.inc(-1)
          }
        })
        return false
      })
    }
  })
}

async function comment(event) {
  event.obj.openid = cloud.getWXContext().OPENID
  db.collection('salary').doc(event._id).update({
    data: {
      comments: _.push(event.obj) || [event.obj]
    }
  })
}
async function likeComment(event) {
  db.collection('salary').doc(event._id).update({
    data: {
      ['comments.' + event.index + '.likes']: _.inc(event.bool ? 1 : -1)
    }
  })
}
async function replyComment(event) {
  event.obj.openid = cloud.getWXContext().OPENID
  db.collection('salary').doc(event._id).update({
    data: {
      ['comments.' + event.index + '.replies']: _.push(event.obj)
    },
  })
}