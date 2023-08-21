// pages/list/list.js

import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    salaries: [],
    communities: [],
    active: 0,

    isLoadingSalaries: false,
    isSalariesMax: false,
    isLoadingCommunities: false,
    isCommunitiesMax: false,
  },
  onSearch(event) {
    this.setData({
      value: event.detail,
      salaries: [],
      isSalariesMax: false,
      communities: [],
      isCommunitiesMax: false
    })
    this.search(0)
    this.search(1)
  },

  search(active) {
    switch (active) {
      case 0:
        if (this.data.isSalariesMax) break //最大限制
        wx.showLoading({
          title: '数据加载中...',
        })

        this.setData({
          isLoadingSalaries: true
        })

        wx.cloud.callFunction({
          name: 'list',
          data: {
            funcName: "querySalary",
            key: this.data.value,
            from: this.data.salaries.length,
            length: 10
          }
        }).then(res => {
          this.setData({
            salaries: [...this.data.salaries, ...(res.result || [])]
          })
          if (!res.result || res.result.length < 10 || this.data.salaries.length >= 50) {
            this.setData({
              isSalariesMax: true
            })
          }

          this.setData({
            isLoadingSalaries: false
          })
          wx.hideLoading()
        });
        
        break
      case 1:
        if (this.data.isCommunitiesMax) break //最大限制
        wx.showLoading({
          title: '数据加载中...',
        })
    

        this.setData({
          isLoadingCommunities: true
        })

        wx.cloud.callFunction({
          name: 'list',
          data: {
            funcName: "queryCommunity",
            key: this.data.value,
            from: this.data.communities.length,
            length: 10
          }
        }).then(res => {
          this.setData({
            communities: [...this.data.communities, ...(res.result || [])]
          })
          if (!res.result || res.result.length < 10 || this.data.communities.length >= 50) {
            this.setData({
              isCommunitiesMax: true
            })
          }
          this.setData({
            isLoadingCommunities: false
          })
          wx.hideLoading()
        });
        break
      default:
        console.log("wrong active, active = " + active)
    }
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
  onChange(event) {
    this.setData({
      ['active']: event.detail
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
    this.setData({
      value: options.value
    })
    this.search(0)
    this.search(1)
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
    this.search(this.data.active)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})