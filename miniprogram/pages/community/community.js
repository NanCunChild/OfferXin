import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    isReachMax:false,
    isLoadingData:false,
    recruitment_items: [],
  },
  onSearch(event) {
    var unproc_recruitment_items = [];
    var that = this;
    if (event.detail == "") return;
    // 在页面或组件中的某个事件中调用云函数
    wx.cloud.callFunction({
      name: 'getRecruitmentData',
      data: {
        action: "getRecruitmentData",
        searchOn: event.detail
      },
      success: async res => {
        console.log(res)
        // 在这里处理云函数返回的数据
        unproc_recruitment_items = res.result;
        console.log(unproc_recruitment_items)
        that.dataProcessing(unproc_recruitment_items)
      },
      fail: err => {
        console.error('云函数调用失败：', err)
        // 在这里处理云函数调用失败的情况
      }
    })

  },
  dataProcessing(original) {
    // console.log("original:")
    // console.log(original)
    for (let i = 0; i < original.length; i++) {
      //字符串 数组化
      original[i].location = original[i].location.split(',');
      original[i].position_A = original[i].position_A.split(',');
      original[i].position_B = original[i].position_B.split(',');
      original[i].position_C = original[i].position_C.split(',');

      if (original[i].location.length > 2) {
        original[i].location_simple = original[i].location.slice(0, 2);
        original[i].location_simple[2] = "...";
      } else {
        original[i].location_simple = original[i].location;
      }

      let dateParts = original[i].update_date.split("/");
      let year = dateParts[0];
      let month = dateParts[1];
      let day = dateParts[2];
      original[i].update_date = `${year}年${month}月${day}日`;

      // console.log(original[i]);
    }
    this.setData({
      recruitment_items: original
    })
    return "ca"
  },
  goRecruitmentDetail(event){
    wx.navigateTo({
      url: '/pages/salaryDetail/salaryDetail?_id=' + event.currentTarget.dataset.id
    })
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