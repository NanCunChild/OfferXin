// components/salary_card/salary_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    postTreat: function (event) {
      console.log(event);
      console.log(this.data.item);
      let item = JSON.stringify(this.data.item);
      console.log(item);
      wx.reLaunch({
        url: "/pages/publish/publish?item=" + item,
      });
    },
  },
});
