// components/recruitment_card/recruitment_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object,
    tabIndex: Number,
    isRecommand: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    goRecruitmentDetail(event) {
      var viewData = event.currentTarget.dataset.viewdata || 0;
      var _id = event.currentTarget.dataset._id;
      let recruitTarget = event.currentTarget.dataset.recruittarget;
      let dbName = event.currentTarget.dataset.dbname;

      if (!dbName) {
        dbName = "RecruitmentsSet";
        if (this.properties.tabIndex === 1) {
          dbName = "InternalSet";
        } else if (recruitTarget === "校招" && this.properties.tabIndex !== 1) {
          dbName = "RecruitmentsSet";
        } else if (recruitTarget === "实习") {
          dbName = "InternshipSet";
        }
      }

      wx.cloud.callFunction({
        name: "getRecruitmentData", // 云函数的名称
        data: {
          action: "viewData",
          _id: _id,
          viewData: viewData + 1,
          dbName,
        },
        success: (res) => {
          console.log("数据写入成功", res);
        },
        fail: (err) => {
          console.error("数据写入失败", err);
        },
      });

      wx.navigateTo({
        url: `/pages/recruitment_details/recruitment_details?_id=${event.currentTarget.dataset._id}&dbName=${dbName}&isRecommand=${this.properties.isRecommand}`,
      });
    },
    // plusview
  },
});
