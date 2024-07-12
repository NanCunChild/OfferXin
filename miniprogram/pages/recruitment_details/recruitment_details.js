// const { TextDefaultComponents } = require("XrFrame/elements");

// pages/recruitment_details/recruitment_details.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data_id: "",
    all_data: {},
    activeTabber: "recruitment_details",
    isGroupCodeShow: false,
    isfavorited: false,
    isCommentShow: false,
    recruitment_items: [],
    showOutRecruitmentItems: [],
    recommandData: [],
    dbName: "",
    isRecommand: false,
    // locationSet: [],
    // posisionASet: [],
    // posisionBSet: [],
    // posisionCSet: [],
    // qualification_overseas: [],
    // qualification_domestics: [],
  },

  onLoad(options) {
    this.getRecommandData();
    this.setData({
      dbName: options.dbName,
      isRecommand: options.isRecommand == "true",
    });

    let a = {
      detail: "",
    };
    this.onSearch(a);
    if (options == undefined) return;
    if (options.all_data != undefined) {
      this.setData({
        all_data: JSON.parse(options.all_data),
      });
    } else {
      this.setData({
        data_id: options._id,
      });
      this.getDatabyId(options.dbName);
    }

    const collectRecruitments = wx.getStorageSync("collectRecruitments") || [];

    if (
      !collectRecruitments.filter((item) => item._id === options._id).length
    ) {
      this.setData({
        isfavorited: false,
      });
    } else {
      this.setData({
        isfavorited: true,
      });
    }
  },

  goSearchSelary() {
    wx.switchTab({
      url: "/pages/index/index",
    });
  },
  getRecommandData() {
    wx.cloud.callFunction({
      name: "getRecruitmentData",
      data: {
        action: "getRecommandData",
        size: 1,
      },
      success: async (res) => {
        console.log("res.result", res.result);
        this.setData({
          recommandData: res.result,
        });
      },
      fail: (err) => {
        console.error("云函数调用失败：", err);
      },
    });
  },
  onSearch(event) {
    var that = this;
    this.setData({
      searchKey: event.detail,
    });

    // let actionName;
    // if (this.data.dbName === "RecruitmentsSet") {
    //   actionName = "getRecruitmentData";
    // } else if (this.data.dbName === "InternalSet") {
    //   actionName = "getInternalData";
    // } else if (this.data.dbName === "InternshipSet") {
    //   actionName = "getInternshipData";
    // }

    // if (this.data.isRecommand) {
    //   actionName = "getRecommandData";
    // }

    wx.cloud.callFunction({
      name: "getRecruitmentData",
      data: {
        action: "getRecent20Data",
        type: this.data.dbName,
      },
      success: async (res) => {
        console.log(res);
        // // 在这里处理云函数返回的数据
        console.log("res.result ===>", res.result);
        that.dataProcessing1(res.result);
      },
      fail: (err) => {
        console.error("云函数调用失败：", err);
        // 在这里处理云函数调用失败的情况
      },
    });
  },
  dataProcessing1(original) {
    if (original == undefined) return;
    for (let i = 0; i < original.length; i++) {
      //字符串 数组化
      original[i].location = original[i].location.split(",");
      original[i].position_A = original[i].position_A.split(",");
      original[i].position_B = original[i].position_B.split(",");
      original[i].position_C = original[i].position_C.split(",");
      original[i].qualification_overseas =
        original[i].qualification_overseas.split(",");
      original[i].qualification_domestics =
        original[i].qualification_domestics.split(",");

      if (original[i].location.length > 2) {
        original[i].location_simple = original[i].location.slice(0, 2);
        original[i].location_simple[2] = "...";
      } else {
        original[i].location_simple = original[i].location;
      }

      // let dateParts = original[i].update_date.split("/");
      // let year = dateParts[0];
      // let month = dateParts[1];
      // let day = dateParts[2];
      // original[i].update_date = `${year}-${month}-${day}`;
    }
    this.setData({
      recruitment_items: original,
      showOutRecruitmentItems: original,
    });
    wx.setStorageSync(
      "showOutRecruitmentItems",
      this.data.showOutRecruitmentItems
    );
    return "ca";
  },
  getDatabyId(dbName) {
    if (this.data.isRecommand) {
      dbName = "RecommandSet";
    }
    wx.cloud.callFunction({
      name: "getRecruitmentData",
      data: {
        action: "getDatabyId",
        searchOn: this.data.data_id,
        dbName,
      },
      success: async (res) => {
        // // 在这里处理云函数返回的数据
        console.log("res", res);
        this.dataProcessing(res.result[0]);
      },
      fail: (err) => {
        console.error("云函数调用失败：", err);
        // 在这里处理云函数调用失败的情况
      },
    });
  },
  dataProcessing(original) {
    if (original == undefined) return;
    console.log("original.location", original);
    original.location = original.location.split(",");
    original.position_A = original.position_A.split(",");
    original.position_B = original.position_B.split(",");
    original.position_C = original.position_C.split(",");
    original.qualification_overseas =
      original.qualification_overseas.split(",");
    original.qualification_domestics =
      original.qualification_domestics.split(",");

    // let tempDateArr = original.start_date.split("/");
    // let tempYear = tempDateArr[0];
    // let tempMonth = tempDateArr[1];
    // let tempDay = tempDateArr[2];
    // original.start_date = tempYear + "-" + tempMonth + "-" + tempDay;

    // tempDateArr = original.update_date.split("/");
    // tempYear = tempDateArr[0];
    // tempMonth = tempDateArr[1];
    // tempDay = tempDateArr[2];
    // original.update_date = tempYear + "-" + tempMonth + "-" + tempDay;

    this.setData({
      all_data: original,
    });
    console.log("all_data", original);
  },
  onTapDetailSalary() {
    wx.showModal({
      title: "暂无相关资料",
      content: "该公司无相关薪资资料，点击确定返回搜索页面搜索",
      complete: (res) => {
        if (res.cancel) {
        }

        if (res.confirm) {
          let tempAllData = this.data.all_data;
          tempAllData.href = "";
          wx.reLaunch({
            url:
              "/pages/index/index?datasss=" +
              JSON.stringify(tempAllData) +
              "&backable=true",
          });
        }
      },
    });
  },
  copyToClipboard(e) {
    console.log(e.currentTarget.dataset.copy);
    if (e.currentTarget.dataset.copy == undefined) return;
    wx.setClipboardData({
      data: e.currentTarget.dataset.copy,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: "已复制",
              icon: "success",
              duration: 1200,
            });
          },
        });
      },
    });
  },
  joinGroup() {
    this.showGroupCode();
  },
  showGroupCode() {
    this.setData({
      isGroupCodeShow: true,
    });
  },
  hideGroupCode() {
    this.setData({
      isGroupCodeShow: false,
    });
  },

  async onTapFavorite() {
    if (this.data.isfavorited) {
      this.setData({
        isfavorited: false,
      });
    } else {
      this.setData({
        isfavorited: true,
      });
    }

    await wx.cloud.callFunction({
      name: "salaryDetail",
      data: {
        funcName: "collectRecruitment",
        item: { ...this.data.all_data, dbName: this.data.dbName },
      },
    });

    setTimeout(() => {
      wx.cloud
        .callFunction({
          name: "mine",
          data: {
            funcName: "collectRecruitment",
          },
        })
        .then((res) => {
          console.log("collectRecruitments", res.result);
          wx.setStorageSync("collectRecruitments", res.result || []);
        });
    }, 1000);
  },

  onTapFeedback() {
    this.setData({
      isCommentShow: true,
    });
  },

  onTapForward() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },

  goRecruitmentDetail(event) {
    var viewData = event.currentTarget.dataset.viewdata || 0;
    var _id = event.currentTarget.dataset._id;
    var index = this.data.recruitment_items.findIndex(
      (item) => item._id === _id
    );

    this.setData({
      [`recruitment_items[${index}].viewData`]: viewData + 1,
    });

    wx.cloud.callFunction({
      name: "getRecruitmentData", // 云函数的名称
      data: {
        action: "viewData",
        _id: _id,
        viewData: viewData + 1,
        dbName: this.data.dbName,
      },
      success: (res) => {
        console.log("数据写入成功", res);
      },
      fail: (err) => {
        console.error("数据写入失败", err);
      },
    });
    wx.navigateTo({
      url: `/pages/recruitment_details/recruitment_details?_id=${event.currentTarget.dataset._id}&dbName=${this.data.dbName}`,
    });
  },

  sortingData() {},
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
  onShareTimeline() {
    return {
      title: "数十万大学生使用的求职校招找工作神器！找名企，查薪资！",
    };
  },

  onChangeTabber(event) {
    console.log(event);
    if (this.data.activeTabber == "recruitment_details") {
      this.setData({
        activeTabber: "salary_details",
      });
    } else {
      this.setData({
        activeTabber: "recruitment_details",
      });
    }
  },
});
