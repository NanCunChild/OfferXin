import Toast from '@vant/weapp/toast/toast';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    avator: '',
    showShare: false,
  },
  showShare() {
    this.setData({
      showShare: true
    });
  },
  closePop() {
    this.setData({
      showShare: false,
    });
  },
  preview(){
    Toast('功能待开发')
  },

  register(){
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  onShow(){
    this.setData({
      nickname: app.globalData.nickname,
      avator: app.globalData.avator
    })
  },
  go(e) {
    wx.navigateTo({
      url: '/pages/webview/webview?website=' + e.currentTarget.dataset.url
    })
  },
})