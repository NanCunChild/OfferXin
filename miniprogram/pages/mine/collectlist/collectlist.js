Page({
  /**
   * 页面的初始数据
   */
  data: {
    salaries: [],
    recruitments: [],
    active: 0,

    isLoadingSalaries: false,
    isSalariesMax: false,
    isLoadingRecruitments: false,
  },
  search(active) {
    switch (active) {
      case 0:
        if (this.data.isSalariesMax) break; //最大限制
        wx.showLoading({
          title: "数据加载中...",
        });

        this.setData({
          isLoadingSalaries: true,
        });
        wx.cloud
          .callFunction({
            name: "mine",
            data: {
              funcName: "collectSalary",
              from: this.data.salaries.length,
              length: 10,
            },
          })
          .then((res) => {
            if (!res.result || res.result.length < 10) {
              this.setData({
                isSalariesMax: true,
              });
            }
            this.setData({
              salaries: [...this.data.salaries, ...(res.result || [])],
              isLoadingSalaries: false,
            });
            wx.hideLoading();
          });

        break;
      case 1:
        wx.showLoading({
          title: "数据加载中...",
        });

        this.setData({
          isLoadingRecruitments: true,
        });
        wx.cloud
          .callFunction({
            name: "mine",
            data: {
              funcName: "collectRecruitment",
            },
          })
          .then((res) => {
            this.setData({
              recruitments: res.result,
              isLoadingRecruitments: false,
            });
            wx.hideLoading();
          });

        break;
      default:
        console.log("wrong active, active = " + active);
    }
  },
  goSalaryDetail(event) {
    wx.navigateTo({
      url:
        "/pages/salaryDetail/salaryDetail?_id=" +
        event.currentTarget.dataset.id,
    });
  },
  goCommunityDetail(event) {
    wx.navigateTo({
      url:
        "/pages/communityDetail/communityDetail?_id=" +
        event.currentTarget.dataset.id,
    });
  },
  onChange(event) {
    this.setData({
      ["active"]: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.search(0);
    this.search(1);
  },

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
  onReachBottom() {
    this.search(this.data.active);
  },

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
