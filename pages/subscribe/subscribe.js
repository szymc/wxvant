// pages/subscribe/subscribe.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subscribeDate: '2020.7.20',
    timeSlice: '00:00-00:00',
    total: 0,
    show: false,
    choose: 0,
    max: 3,
    list: [{id: 1,name: 'aa',tel: '11'},{id: 2,name: 'bb',tel: '22'},{id: 3,name: 'cc',tel: '33'}],
    result: []
  },

  choosePerson() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  cancel() {
    this.setData({ show: false });
  },
  submitChoose() {
    if (this.data.result.length == 0) {
      Toast.fail('至少选择一个参观人员');
      return
    }
    this.setData({ show: false });
  },
  add() {

  },
  onChange(event) {
    // console.log(event)
    this.setData({
      result: event.detail
    });
  },
  // 点击单元格触发
  toggle(event) {
    // console.log(event)
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },
  noop() {
    
  },
  cmdSubmit() {
    console.log('11')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      subscribeDate: options.date,
      radio: options.radio,
      timeSlice: options.timeSlice
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})