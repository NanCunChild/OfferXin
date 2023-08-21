Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    palceholder: String,
    columns: Array,
    title: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    show: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },
    onConfirm(event) {
      const { picker, value, index } = event.detail;
      this.setData({
        show: false,
        value: value
      });
    },
    onCancel() {
      this.setData({
        show: false
      });
    }
  }
})