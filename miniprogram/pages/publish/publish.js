var util = require('../../utils/util')
import Toast from "@vant/weapp/toast/toast";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasSubmittedThisTime: false, // 每次打开页面只允许提交一次

    types: ['校招', '实习', '社招'],
    educations: ['博士双一流', '博士985', '博士211', '博士海归', '博士', '硕士双一流', '硕士985', '硕士211', '硕士海归', '硕士', '本科双一流', '本科985', '本科211', '本科海归', '本科', '大专', '其他'],
    industries: ['IT|互联网|通信', '金融', '采购|贸易|交通|物流', '生产|制造', '能源环保|农业科研', '销售|客服|市场', '财务|人力资源|行政', '项目质量|高级管理', '房产建筑|物业管理', '传媒|印刷|艺术|设计', '咨询|法律|教育|翻译', '服务业', '其他行业', '兼职|实习|社工|其他'],
    companyName:"",
    occupasion:"",
    city:"",
    salary:"",
    target:"",
    qualification:"",
    industry:"",
    note:"",
  },
  submit(event){
    var info = {
      company: this.selectComponent(".info-company").data.value,
      job: this.selectComponent(".info-job").data.value,
      city: this.selectComponent(".info-city").data.value,
      salary: this.selectComponent(".info-salary").data.value,
      type: this.selectComponent(".info-type").data.value,
      education: this.selectComponent(".info-education").data.value,
      industry: this.selectComponent(".info-industry").data.value,
      evaluation: this.selectComponent(".info-evaluation").data.value,
      time:  util.formatDate(new Date())
    };
    if(info.company.length == 0) Toast('请填写：公司');
    else if(info.job.length == 0) Toast('请填写：岗位');
    else if(info.city.length == 0) Toast('请填写：城市');
    else if(info.salary.length == 0) Toast('请填写：薪资');
    else if(info.type.length == 0) Toast('请选择：类型');
    else if(info.education.length == 0) Toast('请选择：学历');
    else if(info.industry.length == 0) Toast('请选择：行业');
    else if(this.data.hasSubmittedThisTime)  Toast('请勿重复提交');
    else { // 本次没有提交过
      wx.cloud.callFunction({
        name: 'publish',
        data: {
          info: info
        }
      }).then(res=>{
        this.data.hasSubmittedThisTime = true;
        Toast('爆料成功');
      }).catch(console.error);
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      let item=JSON.parse(options.item)
      console.log(item);
      this.setData({
          companyName:item.company,
          occupasion:item.industry,
          city:item.city,
          salary:item.salary,
          type:item.type,
          qualification:item.education,
          industry:item.industry,
          note:item.evaluation,
      })
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
    this.data.hasSubmittedThisTime = false;
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})