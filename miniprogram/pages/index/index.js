import Toast from '@vant/weapp/toast/toast';
const app = getApp()

// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ads: [],
    active: 0,
    searchHistory: {
      has: false,
      list: []
    },
    showCover: true,
    searchContent: "",
    backable: false,
    datasss: undefined,
  },
  search(e) {
    this.setSearchHistory(e.detail.value);
    wx.navigateTo({
      url: '/pages/list/list?value=' + e.detail.value,
    });
    wx.cloud.callFunction({
      name: 'index',
      data: {
        action: "1",
        info: e.detail.value
    }
  })
},
hideCover() {
    this.setData({
      showCover: false
    })
  },
  handleSearchHistory(e){
    const key = e.currentTarget.dataset.key;
    wx.navigateTo({
      url: '/pages/list/list?value=' + key,
    })
  },
  // 记录浏览历史缓存
  setSearchHistory(e) {
    let history = wx.getStorageSync('searchHistory') || [];
    history.unshift(e);
    wx.setStorageSync('searchHistory', history)
  },
  // 获取浏览历史缓存
  getSearchHistory() {
    let history = wx.getStorageSync('searchHistory') || [];
    if (history.length) {
      let searchHistory = {
          has: true,
          list: history.slice(0,5)
        }
        this.setData({
          searchHistory
        })
    }
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
  go(e) {
    wx.navigateTo({
      url: "/pages/webview/webview?website=" + e.currentTarget.dataset.url,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name: 'index',
      data:{
        action: '2'
      }
    }).then(res => {
      this.setData({
        ads: res.result
      })
    });
    if (options == undefined) return;
    let datass = options.datasss && JSON.parse(options.datasss);
    console.log("datass",datass);

    this.setData({
      searchContent: datass?.company_name,
      backable: options.backable || false,
      datasss: JSON.stringify(datass),
    })
    // console.log(this.data.backable)
  },
  onTapBackBtn() {
    wx.navigateTo({
      url: '/pages/recruitment_details/recruitment_details?all_data=' + this.data.datasss
    });
  },
  changeSwiper(e){
    this.setData({
      active: e.detail.current
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
    this.getSearchHistory()
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

  },
  onShareTimeline() {
        return{
          title: '数十万大学生使用的求职校招找工作神器！找名企，查薪资！'
        }
      },
    
})