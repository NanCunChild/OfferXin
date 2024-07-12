// pages/list/list.js

import Toast from "@vant/weapp/toast/toast";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    tabs: [
      {
        id: 1,
        title: "综合",
      },
      {
        id: 2,
        title: "招聘",
      },
    ],
    conditions: [
      {
        id: 1,
        title: "校招",
      },
      {
        id: 2,
        title: "实习",
      },
      {
        id: 3,
        title: "排序方式",
        icon: "/images/down.png",
      },
      {
        id: 4,
        title: "爆料时间",
        icon: "/images/down.png",
      },
      {
        id: 5,
        title: "学历",
        icon: "/images/down.png",
      },
    ],
    dropdownShow0: false,
    dropdownShow1: false,
    dropdownShow2: false,
    dropdownShow3: false,
    value: "",
    salaries: [],
    recruitments: [],
    active: 0,
    isGoTopShow: false,
    isLoadingSalaries: false,
    isSalariesMax: false,
    isLoadingRecruitments: false,
    isRecruitmentMax: false,
    showDropdownMenu: false,
    submitform: {
      recruitment_target: "校招",
      time: "",
      education: "",
    },
  },
  // 点击不限
  handleBx() {
    let submitform = JSON.parse(JSON.stringify(this.data.submitform));
    submitform.recruitment_target = "";
    this.setData({
      salaries: [],
      isSalariesMax: false,
      submitform,
    });
    this.search(0);
  },
  // 点击校招
  handleXz() {
    let submitform = JSON.parse(JSON.stringify(this.data.submitform));
    submitform.recruitment_target = "校招";
    this.setData({
      salaries: [],
      isSalariesMax: false,
      submitform,
    });
    this.search(0);
  },
  // 点击实习
  handleSx() {
    let submitform = JSON.parse(JSON.stringify(this.data.submitform));
    submitform.recruitment_target = "实习";
    this.setData({
      salaries: [],
      isSalariesMax: false,
      submitform,
    });
    this.search(0);
  },
  // 点击社招
  handleSz() {
    let submitform = JSON.parse(JSON.stringify(this.data.submitform));
    submitform.recruitment_target = "社招";
    this.setData({
      salaries: [],
      isSalariesMax: false,
      submitform,
    });
    this.search(0);
  },
  onSearch(event) {
    this.setData({
      value: event.detail,
      salaries: [],
      isSalariesMax: false,
      recruitments: [],
      isRecruitmentMax: false,
    });
    this.search(0);
    this.search(1);
  },
  handleTabTap: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      tabIndex: index,
    });
    if (index === 0) {
      this.search(0);
    } else {
      this.search(1);
    }
  },
  toggleDropdown: function (e) {
    let dataset = e.currentTarget.dataset;
    if (dataset.toggle == "dropdown0") {
      this.setData({
        dropdownShow0: !this.data.dropdownShow0,
      });
    } else if (dataset.toggle == "dropdown1") {
      this.setData({
        dropdownShow1: !this.data.dropdownShow1,
      });
    } else if (dataset.toggle == "dropdown2") {
      this.setData({
        dropdownShow2: !this.data.dropdownShow2,
      });
    } else if (dataset.toggle == "dropdown3") {
      this.setData({
        dropdownShow3: !this.data.dropdownShow3,
      });
    }
  },
  onRiCChange(event) {
    this.setData({
      RiC: event.detail,
    });
  },
  onRiPChange(event) {
    this.setData({
      RiP: event.detail,
    });
  },
  onInteChange(event) {
    this.setData({
      Inte: event.detail,
    });
  },
  filterByTime() {
    console.log("before", this.data.salaries);
    this.data.salaries.sort((a, b) => {
      const aDate = new Date(a.info.time).getTime();
      const bDate = new Date(b.info.time).getTime();
      console.log("aDate", aDate, bDate);
      return bDate - aDate;
    });
    console.log("after", this.data.salaries);

    this.setData({
      salaries: this.data.salaries,
      dropdownShow1: false,
    });
  },
  filterByView() {
    this.data.salaries.sort((a, b) => {
      return b.info.views - a.info.views;
    });
    this.setData({
      salaries: this.data.salaries,
      dropdownShow1: false,
    });
  },
  filterByYear(e) {
    let year = e.currentTarget.dataset.year;
    this.setData({
      salaries: [],
      isSalariesMax: false,
      submitform: { ...this.data.submitform, time: +year },
      dropdownShow2: false,
    });
    this.search(0);
  },
  filterByDegree(e) {
    let education = e.currentTarget.dataset.education;
    this.setData({
      salaries: [],
      isSalariesMax: false,
      submitform: { ...this.data.submitform, education },
      dropdownShow3: false,
    });
    this.search(0);
  },
  onClickFlitingBtn(event) {
    this.selectComponent("#fliter").toggle();
    let RiC = this.data.RiC;
    let RiP = this.data.RiP;
    let Inte = this.data.Inte;
    let con1 = RiC == true ? "校招" : "";
    let con2 = RiP == true ? "社招" : "";
    let con3 = Inte == true ? "实习" : "";
    wx.showLoading({
      title: "数据加载中",
    });
    // let temp = this.data.salaries;
    // console.log(RiC, RiP, Inte);
    // console.log(con1, con2, con3);
    // console.log(this.data.salaries)
    // let temp1 = [];
    // for (let i = 0; i < temp.length; i++) {
    //     if (temp[i].type == con1 || temp[i].type == con2 || temp[i].type == con3) {
    //         temp1.push(temp[i]);
    //     }
    // }
    // console.log(temp1);
    // this.setData({
    //     salaries: temp1
    // })
    wx.cloud
      .callFunction({
        name: "list",
        data: {
          ...this.data.submitform,
          funcName: "querySalary",
          key: this.data.value,
          from: this.data.salaries.length,
          length: 10,
        },
      })
      .then((res) => {
        this.setData({
          salaries: [...this.data.salaries, ...(res.result || [])],
        });
        if (
          !res.result ||
          res.result.length < 10 ||
          this.data.salaries.length >= 50
        ) {
          this.setData({
            isSalariesMax: true,
          });
        }

        this.setData({
          isLoadingSalaries: false,
        });
        wx.hideLoading();
      });
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
          console.log('调用参数：', {
            ...this.data.submitform,
            funcName: "querySalary",
            key: this.data.value,
            from: this.data.salaries.length,
            length: 10,
          });
        wx.cloud
          .callFunction({
            name: "list",
            data: {
              ...this.data.submitform,
              funcName: "querySalary",
              key: this.data.value,
              from: this.data.salaries.length,
              length: 10,
            },
          })
          .then((res) => {
            console.log("res querySalary", res);
            this.setData({
              salaries: [...this.data.salaries, ...(res.result || [])],
            });
            console.log("res", res);
            if (
              !res.result ||
              res.result.length < 10 ||
              this.data.salaries.length >= 50
            ) {
              this.setData({
                isSalariesMax: true,
              });
            }

            this.setData({
              isLoadingSalaries: false,
            });
            wx.hideLoading();
          });

        break;
      case 1:
        if (this.data.isRecruitmentMax) break; //最大限制
        wx.showLoading({
          title: "数据加载中...",
        });

        this.setData({
          isLoadingRecruitments: true,
        });

        wx.cloud
          .callFunction({
            name: "list",
            data: {
              funcName: "queryRecruitment",
              key: this.data.value,
              from: this.data.recruitments.length,
              length: 10,
            },
          })
          .then((res) => {
            this.setData({
              recruitments: [...this.data.recruitments, ...(res.result || [])],
            });
            if (
              !res.result ||
              res.result.length < 10 ||
              this.data.recruitments.length >= 50
            ) {
              this.setData({
                isRecruitmentMax: true,
              });
            }
            this.setData({
              isLoadingRecruitments: false,
            });
            wx.hideLoading();
            console.log("recruitments", this.data.recruitments);
          });
        break;
      default:
        console.log("wrong active, active = " + active);
    }
  },
  onPageScroll: function (e) {
    // console.log(e);
    let isTop = e.scrollTop > 100;
    // console.log(isTop);
    this.setData({
      isGoTopShow: isTop,
    });
  },
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
    });
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
  toRecruitment() {
    wx.switchTab({
      url: "/pages/community/community",
    });
  },
  onChange(event) {
    console.log("event", event);
    this.setData({
      ["active"]: event.detail,
    });
  },
  go(e) {
    wx.navigateTo({
      url: "/pages/webview/webview?website=" + e.currentTarget.dataset.url,
    });
  },
  postTreat: function (event) {
    console.log(event);
    console.log(this.data.item);
    let item = JSON.stringify(this.data.item);
    console.log(item);
    wx.navigateTo({
      url: "/pages/publish/publish?item=" + item,
    });
  },
  postTreatB: function (event) {
    wx.reLaunch({
      url: "/pages/publish/publish",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      value: options.value,
    });
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
    this.search(this.data.tabIndex);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  onShareTimeline() {
    return {
      title: "数十万大学生使用的求职校招找工作神器！找名企，查薪资！",
    };
  },
});
