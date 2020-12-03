// pages/register/register.js
var api = require('../../utils/apiManagement.js');
import { isCellphone } from '../../utils/util'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    sms: '',
    isSms: false,
    password: '',
    checkpass: '',
    checked: false,
    company: '请选择一个博物馆',
    companyid: '',
    // 表单验证
    nameMsg: '',
    phoneMsg: '',
    smsMsg: '',
    passMsg: '',
    checkpassMsg: '',
    //
    showcompany: false,
    actionscompany: [],
    companyChoose: false,
    isShow: true
  },
  inputName(event) {
    this.setData({ name: event.detail })
  },
  inputPhone(event) {
    this.setData({ phone: event.detail })
  },
  inputSms(event) {
    this.setData({ sms: event.detail })
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

    let params = {
      phone: this.data.phone,
      isUser: false
    }
    api.f_guestsmsCode(params).then(res => {
      if (res.data.code == 200) {
        Notify({ type: 'success', message: '验证码发送成功,5分钟内有效' });
        this.setData({ isSms: true })
      } else {
        Toast.fail(res.data.message);
      }
    }).catch(err => {
      // console.log(err)
    })

  },
  inputPass(event) {
    this.setData({ password: event.detail })
  },
  inputCheckpass(event) {
    this.setData({ checkpass: event.detail })
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
  showcompanys() {
    this.setData({ showcompany: true });
  },
  onClose() {
    this.setData({ showcompany: false });
  },
  // 选择博物馆
  onSelect(event) {
    this.setData({
      company: event.detail.name,
      companyid: event.detail.id,
      companyChoose: true,
      isShow: false
    })
  },
  userInfo() {
    if (this.data.companyid) {
      wx.navigateTo({ url: '/pages/userLoginInfo/userLoginInfo?companyid=' +  this.data.companyid})
    }
  },
  submit() {
    if (this.data.name.length == 0) {
      this.setData({ nameMsg: '用户名不能为空' })
      return
    } else {
      this.setData({ nameMsg: '' })
    }

    if (this.data.phone.length == 0) {
      this.setData({ phoneMsg: '手机号不能为空' })
      return
    } else if (!isCellphone(this.data.phone)) {
      this.setData({ phoneMsg: '请输入正确的手机格式' })
      return
    } else {
      this.setData({ phoneMsg: '' })
    }

    if (!this.data.isSms) {
      Toast.fail('请先发送验证码或发送失败');
      return
    }

    if (this.data.sms.length == 0) {
      this.setData({ smsMsg: '验证码不能为空' })
      return
    } else {
      this.setData({ smsMsg: '' })
    }

    if (this.data.password.length == 0) {
      this.setData({ passMsg: '密码不能为空' })
      return
    } else if (!(/^.{6,20}$/.test(this.data.password))) {
      this.setData({ passMsg: '密码长度为6-20位' })
      return
    } else {
      this.setData({ passMsg: '' })
    }

    if (this.data.checkpass.length == 0) {
      this.setData({ checkpassMsg: '确认密码不能为空' })
      return
    } else if (this.data.password != this.data.checkpass) {
      this.setData({ checkpassMsg: '两次密码输入不一致' })
      return
    } else {
      this.setData({ passMsg: '' })
    }
    if (this.data.checkpassMsg.length > 0) return

    if (!this.data.companyChoose) {
      Toast.fail('请选择一个博物馆');
      return
    }

    if (!this.data.checked) {
      Toast.fail('注册需同意用户须知');
      return
    }

    let params = {
      account: this.data.name,
      phone: this.data.phone,
      captcha: this.data.sms,
      password: this.data.password,
      password2: this.data.checkpass,
      read: String(this.data.checked),
      companyId: this.data.companyid
    }
    api.p_guestregister(params).then(res => {
      if (res.data.code == 200) {
        Dialog.alert({
          message: '恭喜您，注册成功，将前往登录界面',
        }).then(() => {
          wx.navigateBack()
        });
      } else {
        Toast.fail(res.data.message);
      }
    })
    // wx.navigateBack()
  },
  // 加载博物馆数据
  getCompanys () {
    api.f_companyList().then(res => {
      if (res.data.code == 200) {
        this.setData({
          actionscompany: res.data.datas
        })
      } else {
        Toast.fail(res.data.message || '博物馆查询失败')
      }
    }).catch(err => { })
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
    this.getCompanys()
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