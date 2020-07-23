// pages/register/register.js
import { isCellphone } from '../../utils/util'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    sms: '',
    password: '',
    checkpass: '',
    checked: false,
    // 表单验证
    phoneMsg: '',
    smsMsg: '',
    passMsg: '',
    checkpassMsg: ''
  },
  inputPhone(event) {
    this.setData({phone: event.detail})
  },
  inputSms(event) {
    this.setData({sms: event.detail})
  },
  sendSms() {
    if (this.data.phone.length == 0) {
      Toast.fail('请先填写手机号码');
      return
    }
    if (!isCellphone(this.data.phone)) {
      Toast.fail('请输入正确的手机格式');
      return
    }
    
  },
  inputPass(event) {
    this.setData({password: event.detail})
  },
  inputCheckpass(event) {
    this.setData({checkpass: event.detail})
  },
  blurCheckpass(event) {
    let message = '';
    if (this.data.password != event.detail.value) {
      message = '两次密码输入不一致'
    }
    this.setData({
      checkpassMsg: message
    })
  },
  onUserInfo(event) {
    this.setData({
      checked: event.detail,
    });
  },
  userInfo() {

  },
  submit() {
    if (this.data.phone.length == 0) {
      this.setData({phoneMsg: '手机号不能为空'})
      return
    } else if (!isCellphone(this.data.phone)) {
      this.setData({phoneMsg: '请输入正确的手机格式'})
      return
    } else {
      this.setData({phoneMsg: ''})
    }

    if (this.data.sms.length == 0) {
      this.setData({smsMsg: '验证码不能为空'})
      return
    } else {
      this.setData({smsMsg: ''})
    }

    if (this.data.password.length == 0) {
      this.setData({passMsg: '密码不能为空'})
      return
    } else if (!(/^.{6,20}$/.test(this.data.password))) {
      this.setData({passMsg: '密码长度为6-20位'})
      return
    } else {
      this.setData({passMsg: ''})
    }

    if (this.data.checkpass.length == 0) {
      this.setData({checkpassMsg: '确认密码不能为空'})
      return
    } else if (this.data.password != this.data.checkpass) {
      this.setData({checkpassMsg: '两次密码输入不一致'})
      return
    } else {
      this.setData({passMsg: ''})
    }
    if (this.data.checkpassMsg.length > 0) return

    if (!this.data.checked) {
      Toast.fail('注册需同意用户须知');
      return
    }
    
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