// components/chat_card/chat_card.js
var util = require('../../utils/util')
const app = getApp()
import Toast from '@vant/weapp/toast/toast';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    obj: Object
  },
  /**
   * 组件的初始数据
   */
  data: {
    content: '',
    like: false,
    reply: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike() {
      this.setData({
        ['obj.likes']: (this.data.obj.likes || 0) + (this.data.like ? -1 : 1),
        like: !this.data.like        
      })
      this.triggerEvent('like', {bool: this.data.like})
    },
    showReply() {
      this.setData({
        reply: !this.data.reply,
      })
    },
    onClose() {
      this.setData({
        reply: false
      })

    },
    onConfirm(event) {
      if(this.data.content.length==0) {
        Toast('请输入您的评论')
        return
      }
      let obj = {
        avator: app.globalData.avator,
        nickname: app.globalData.nickname,
        content: this.data.content,
        time: util.formatDate(new Date())
      }
      this.setData({
        ['obj.replies']: [...(this.data.obj.replies || []), ...[obj]],
        content: ''
      })
      this.triggerEvent('reply', {obj: obj})
      wx.showToast({
        title: '发布成功',
      })
    },
    updateValue(event) {
      this.setData({
        content: event.detail.value
      })
    }
  }
})