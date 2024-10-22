// pages/salaryDetail/salaryDetail.js
const util = require("../../utils/util");
const app = getApp();
import Toast from "@vant/weapp/toast/toast";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    obj: {},
    salaries: [],

    active: 0,
  },
  onChange(event) {
    this.setData({
      ["active"]: event.detail.index,
    });
  },
  saveHeat() {
    let _ = wx.cloud.database().command;
    let heat = this.data.obj.info.heat || 0;
    wx.cloud
      .database()
      .collection("salary")
      .doc(this.data.obj._id)
      .update({
        data: {
          "info.heat": (heat += 1),
        },
      })
      .then((res) => {
        wx.cloud
          .callFunction({
            name: "salaryDetail",
            data: {
              funcName: "init",
              length: 10, // salaries 的最大长度
              _id: this.data.obj._id,
            },
          })
          .then((res) => {
            this.setData({
              obj: res.result.obj,
              salaries: res.result.salaries,
            });
            wx.hideLoading();
          });
      });
  },
  saveLike() {
    let _ = wx.cloud.database().command;
    wx.cloud
      .database()
      .collection("salary")
      .doc(this.data.obj._id)
      .update({
        data: {
          "info.likes": (this.data.obj.info.likes += 1),
        },
      })
      .then((res) => {
        wx.cloud
          .callFunction({
            name: "salaryDetail",
            data: {
              funcName: "init",
              length: 10, // salaries 的最大长度
              _id: this.data.obj._id,
            },
          })
          .then((res) => {
            this.setData({
              obj: res.result.obj,
              salaries: res.result.salaries,
            });
            wx.hideLoading();
          });
      });
  },
  like() {
    this.setData({
      ["obj.info.likes"]:
        (this.data.obj.info.likes || 0) + (this.data.obj.info.like ? -1 : 1),
      ["obj.info.like"]: !this.data.obj.info.like,
    });
    wx.cloud.callFunction({
      name: "salaryDetail",
      data: {
        funcName: "like",
        _id: this.data.obj._id,
        bool: this.data.obj.info.like,
      },
    });
  },
  collect() {
    this.setData({
      ["obj.info.collects"]:
        (this.data.obj.info.collects || 0) +
        (this.data.obj.info.collect ? -1 : 1),
      ["obj.info.collect"]: !this.data.obj.info.collect,
    });

    console.log("obj", this.data.obj.info.collect);

    wx.cloud.callFunction({
      name: "salaryDetail",
      data: {
        funcName: "collectSalary",
        _id: this.data.obj._id,
        bool: this.data.obj.info.collect,
      },
    });
  },
  reply() {
    this.setData({
      active: 1,
    });
  },
  go(e) {
    wx.navigateTo({
      url: "/pages/webview/webview?website=" + e.currentTarget.dataset.url,
    });
  },
  comment(event) {
    if (this.data.value.length == 0) {
      Toast("请输入您的评论");
      return;
    }
    let obj = {
      nickname: app.globalData.nickname,
      avator: app.globalData.avator,
      content: this.data.value,
      time: util.formatDate(new Date()),
    };
    this.setData({
      ["obj.comments"]: [...(this.data.obj.comments || []), ...[obj]],
      value: "",
    });
    wx.cloud.callFunction({
      name: "salaryDetail",
      data: {
        funcName: "comment",
        _id: this.data.obj._id,
        content: this.data.value,
        obj: obj,
      },
    });

    Toast("发布成功");
  },
  goSalaryDetail(event) {
    wx.navigateTo({
      url:
        "/pages/salaryDetail/salaryDetail?_id=" +
        event.currentTarget.dataset.id,
    });
  },
  onInput(event) {
    this.setData({
      value: event.detail.value,
    });
  },
  onLike(event) {
    wx.cloud.callFunction({
      name: "salaryDetail",
      data: {
        funcName: "likeComment",
        _id: this.data.obj._id,
        index: event.currentTarget.dataset.index,
        bool: event.detail.bool,
      },
    });
  },
  onReply(event) {
    wx.cloud.callFunction({
      name: "salaryDetail",
      data: {
        funcName: "replyComment",
        _id: this.data.obj._id,
        index: event.currentTarget.dataset.index,
        obj: event.detail.obj,
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: "加载中",
    });
    wx.cloud
      .callFunction({
        name: "salaryDetail",
        data: {
          funcName: "init",
          length: 10, // salaries 的最大长度
          _id: options._id,
        },
      })
      .then((res) => {
        console.log("res", res);
        this.setData({
          obj: res.result.obj,
          salaries: res.result.salaries,
        });
        wx.hideLoading();
      });
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
