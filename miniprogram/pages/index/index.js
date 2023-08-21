import Toast from '@vant/weapp/toast/toast';
const app = getApp()

// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ads: [],
    active: 0
  },
  search(e){
    wx.navigateTo({
      url: '/pages/list/list?value='+e.detail.value,
    })
  },
  onChange(e) {
    this.setData({
      active: e.detail.index,
    })
  },
  ad(e) {
    wx.navigateTo({
      url: '/pages/webview/webview?website=' + this.data.ads[e.currentTarget.dataset.index].url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name: 'index',
    }).then(res => {
      this.setData({
        ads: res.result
      })
    });
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
    console.log('下拉')
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