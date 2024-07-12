// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchData: [],
  },

  search(e) {
    wx.showLoading({
      title: "数据加载中",
    });

    wx.cloud.callFunction({
      name: "getRecruitmentData",
      data: {
        action: "searchRecruit",
        searchOn: e.detail,
      },
      success: async (res) => {
        this.setData({
          searchData: res.result,
        });

        wx.hideLoading();
      },
      fail: (err) => {
        console.error("云函数调用失败：", err);
        wx.hideLoading();
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  onShareTimeline() {
        return{
          title: '数十万大学生使用的求职校招找工作神器！找名企，查薪资！'
        }
      },
    
});
