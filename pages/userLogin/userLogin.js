// pages/userLogin/userLogin.js
var api = require('../../utils/apiManagement.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    nameErr: '',
    passErr: ''
  },
  inputName(event) {
    this.setData({username: event.detail})
  },
  inputPass(event) {
    this.setData({password: event.detail})
  },
  submit() {
    if (this.data.username.length == 0) {
      this.setData({nameErr: '用户名不能为空'})
      return
    } else {
      this.setData({nameErr: ''})
    }
    if (this.data.password.length == 0) {
      this.setData({passErr: '密码不能为空'})
      return
    } else {
      this.setData({passErr: ''})
    }
      let params ={
          phone:this.data.username,
          password:this.data.password,
      }
      api.login(params).then(res => {
        wx.switchTab({url: '/pages/index/index'})
        wx.setStorage({
          key: 'token',
          data: res.data.datas
        })
      }).catch(e => {
        console.log(e)
      })
   
  },
  register() {
    wx.navigateTo({url: '/pages/register/register'})
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