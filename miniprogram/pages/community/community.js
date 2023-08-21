import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    recruitment_items: [],
  },
  onSearch(event) {
    var that = this;
    if (event.detail == "") return;
    // 在页面或组件中的某个事件中调用云函数
    wx.cloud.callFunction({
      name: 'getRecruitmentData',
      data: {
        action: "getRecruitmentData",
        searchOn: event.detail
      },
      success: res => {
        console.log(res)
        // 在这里处理云函数返回的数据
        that.setData({
          recruitment_items: res.result
        })
      },
      fail: err => {
        console.error('云函数调用失败：', err)
        // 在这里处理云函数调用失败的情况
      }
    })
    // console.log("ITEMS:")
    // console.log(this.data.recruitment_items)
  },

  goSalaryDetail(event) {
    wx.navigateTo({
      url: '/pages/salaryDetail/salaryDetail?_id=' + event.currentTarget.dataset.id
    })
  },
  goCommunityDetail(event) {
    wx.navigateTo({
      url: '/pages/communityDetail/communityDetail?_id=' + event.currentTarget.dataset.id
    })
  },
  go(e) {
    wx.navigateTo({
      url: '/pages/webview/webview?website=' + e.currentTarget.dataset.url
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    // this.setData({
    //   communities: [],
    //   isCommunitiesMax: false,
    //   random: true
    // })
    // this.search()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.search()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})