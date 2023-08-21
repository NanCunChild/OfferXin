var app = getApp();
var db = wx.cloud.database();

Page({
      /**
       * 页面的初始数据
       */
      data: {
            list: [{
                  title: '该程序是做什么的？',
                  id: 0,
                  des: ['本程序主要是方便朋友们发布与获取行业薪资现状的。'
                  ],
                  check: true,
            }, {
                  title: '该程序收费吗？',
                  id: 1,
                  des: ['本程序是完全的公益项目，永久承诺不收取任何中介费，您可以随心所欲的发布和查询相关薪资'],
                  check: false,
            } ]
      },
      onReady() {},

      show(e) {
            var that = this;
            let ite = e.currentTarget.dataset.show;
            let list = that.data.list;
            if (!ite.check) {
                  list[ite.id].check = true;
            } else {
                  list[ite.id].check = false;
            }
            that.setData({
                  list: list
            })
      },
      //跳转页面
      go(e) {
            wx.navigateTo({
                  url: e.currentTarget.dataset.go
            })
      },
      onLoad() {

      },

})