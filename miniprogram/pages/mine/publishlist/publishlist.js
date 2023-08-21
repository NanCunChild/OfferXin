Page({
  /**
   * 页面的初始数据
   */
  data: {
    salaries: [],
    communities: [],
    active: 0,

    isLoadingSalaries: false,
    isSalariesMax: false,
    isLoadingCommunities: false,
    isCommunitiesMax: false,
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
          name: 'mine',
          data: {
            funcName: "publishSalary",
            from: this.data.salaries.length,
            length: 10
          }
        }).then(res => {
          if (!res.result || res.result.length < 10) {
            this.setData({
              isSalariesMax: true
            })
          }
          this.setData({
            salaries: [...this.data.salaries, ...(res.result || [])],
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
          name: 'mine',
          data: {
            funcName: "publishCommunity",
            from: this.data.communities.length,
            length: 10
          }
        }).then(res => {
          if (!res.result || res.result.length < 10) {
            this.setData({
              isCommunitiesMax: true
            })
          }
          this.setData({
            communities: [...this.data.communities, ...(res.result || [])],
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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