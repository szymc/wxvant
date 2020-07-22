// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    sms: '',
    password: '',
    checkpass: '',
    checked: false
  },
  inputPhone(event) {
    this.setData({phone: event.detail})
  },
  inputSms(event) {
    this.setData({sms: event.detail})
  },
  inputPass(event) {
    this.setData({password: event.detail})
  },
  inputCheckpass(event) {
    this.setData({checkpass: event.detail})
  },
  onUserInfo(event) {
    this.setData({
      checked: event.detail,
    });
  },
  userInfo() {

  },
  submit() {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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