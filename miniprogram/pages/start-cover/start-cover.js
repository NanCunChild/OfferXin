// pages/start-cover/start-cover.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 3,
    timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.countDown()
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  countDown() {
    this.timer = setInterval(() => {
      this.setData({
        time: this.data.time - 1
      })
      if (this.data.time < 1) {
        clearInterval(this.timer)
        this.setData({
          time: this.data.time - 1
        })
        this.gotoIndex()
      }
    }, 1000)
  },
  go(e) {
    wx.navigateTo({
      url: "/pages/webview/webview?website=" + e.currentTarget.dataset.url,
    });
  },
  gotoIndex() {
    console.log('---------');
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})