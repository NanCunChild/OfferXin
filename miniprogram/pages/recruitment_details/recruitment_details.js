// pages/recruitment_details/recruitment_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj:{},
    data_id: "",
    all_data: {},
    isGroupCodeShow: false,
    isfavorited: false,
    isCommentShow:false,
    // locationSet: [],
    // posisionASet: [],
    // posisionBSet: [],
    // posisionCSet: [],
    // qualification_overseas: [],
    // qualification_domestics: [],
  },

  onLoad(options) {
    // console.log(options._id);
    if (options == undefined) return
    this.setData({
      data_id: options._id
    })
    this.getDatabyId();
  },

  getDatabyId() {
    // console.log(this.data.data_id);
    // console.log(typeof (this.data.data_id));
    wx.cloud.callFunction({
      name: 'getRecruitmentData',
      data: {
        action: "getDatabyId",
        searchOn: this.data.data_id
      },
      success: async res => {
        // console.log(res)
        // // 在这里处理云函数返回的数据
        // console.log(res.result)
        this.dataProcessing(res.result[0]);
      },
      fail: err => {
        console.error('云函数调用失败：', err)
        // 在这里处理云函数调用失败的情况
      }
    })
  },
  dataProcessing(original) {
    console.log(original)
    original.location = original.location.split(",");
    original.position_A = original.position_A.split(",");
    original.position_B = original.position_B.split(",");
    original.position_C = original.position_C.split(",");
    original.qualification_overseas = original.qualification_overseas.split(",");
    original.qualification_domestics = original.qualification_domestics.split(",");
    this.setData({
      all_data: original
    })
    console.log(original);
  },
  copyToClipboard(e) {
    console.log(e.currentTarget.dataset.copy)
    if (e.currentTarget.dataset.copy == undefined) return;
    wx.setClipboardData({
      data: e.currentTarget.dataset.copy,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  joinGroup() {
    this.showGroupCode();
  },
  showGroupCode() {
    this.setData({
      isGroupCodeShow: true
    })
  },
  hideGroupCode() {
    this.setData({
      isGroupCodeShow: false
    })
  },

  onTapFavorite() {
    if (this.data.isfavorited) {
      this.setData({
        isfavorited: false
      })
    }else{
      this.setData({
        isfavorited: true
      })
    }
    this.setData({
      ['obj.info.collects']: (this.data.obj.info.collects || 0) + (this.data.obj.info.collect ? -1 : 1),
      ['obj.info.collect']: !this.data.obj.info.collect,
    })
    wx.cloud.callFunction({
      name: 'salaryDetail',
      data: {
        funcName: 'collect',
        _id: this.data.obj._id,
        bool: this.data.obj.info.collect
      }
    })
  },

  onTapFeedback(){
    this.setData({
      isCommentShow:true
    })
  },

  sortingData() {

  },
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