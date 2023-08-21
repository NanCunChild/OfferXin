// pages/register/register.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    avator: '',

    avators: [
      '/images/avator/avator01.png', 
      '/images/avator/avator02.png', 
      '/images/avator/avator03.png', 
      '/images/avator/avator04.png', 
      '/images/avator/avator05.png'
    ],

    show: false
  },
  onInput(event) {
    if (event.detail.value.length > 8) {
      wx.showToast({
        title: '最长为8个字符',
        icon: 'error'
      })
    }
    this.setData({
      nickname: event.detail.value.slice(0, 8)
    })
  },
  onDialogShow() {
    this.setData({
      show: true
    })
  },
  onDialogClose() {
    this.setData({
      show: false
    })
  },
  commit() {
    if (this.data.nickname && this.data.nickname.length > 0) {
      wx.cloud.callFunction({
        name: 'register',
        data: {
          nickname: this.data.nickname,
          avator: this.data.avator
        }
      }).then(res => {
        wx.showToast({
          title: '提交成功',
        })
      }, res => {
        wx.showToast({
          title: '上传失败',
          icon: 'error'
        })
      })
    } else {
      wx.showToast({
        title: '请设置用户名',
        icon: 'error'
      })
    }
    app.globalData.nickname = this.data.nickname
    app.globalData.avator = this.data.avator
  },
  setAvator(event){
    this.setData({
      avator: 'cloud://cloud1-9g60aedw7fbba590.636c-cloud1-9g60aedw7fbba590-1312971769/avators/' + event.currentTarget.dataset.avator + '.jpg',
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      nickname: app.globalData.nickname,
      avator: app.globalData.avator
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})