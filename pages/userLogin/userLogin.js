// pages/userLogin/userLogin.js
var api = require('../../utils/apiManagement.js');
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    nameErr: '',
    passErr: '',
    company: '',
    showCompany: false,
    companyList: []
  },
  inputName (event) {
    this.setData({ username: event.detail })
  },
  inputPass (event) {
    this.setData({ password: event.detail })
  },
  submit () {
    if (this.data.username.length == 0) {
      this.setData({ nameErr: '用户名不能为空' })
      return
    } else {
      this.setData({ nameErr: '' })
    }
    if (this.data.password.length == 0) {
      this.setData({ passErr: '密码不能为空' })
      return
    } else {
      this.setData({ passErr: '' })
    }
    if (!wx.getStorageSync('pwcompanyid')) {
      Toast.fail('请选择一个登录的博物馆');
      return
    }
    let params = {
      phone: this.data.username,
      password: this.data.password,
      companyId: wx.getStorageSync('pwcompanyid')
    }
    api.login(params).then(res => {
      // console.log(res)
      if (res.data.code != 200) {
        Dialog.alert({
          message: `${res.data.message}`,
        }).then(() => {

        });
      } else {
        wx.setStorage({
          key: 'token',
          data: res.data.datas
        })
        wx.switchTab({ url: '/pages/index/index' })
      }
    }).catch(e => {
      // console.log(e)
    })

  },
  register () {
    wx.navigateTo({ url: '/pages/register/register' })
  },
  // 加载博物馆数据
  getCompanys () {
    api.f_companyList().then(res => {
      if (res.data.code == 200) {
        this.setData({
          companyList: res.data.datas
        })
      } else {
        Toast.fail(res.data.message || '博物馆查询失败')
      }
    }).catch(err => { })
  },
  openCompany () {
    this.setData({ showCompany: true })
  },
  cmdConfirm (event) {
    let id = event.currentTarget.dataset.id
    let name = event.currentTarget.dataset.name
    Dialog.confirm({
      message: `是否确认选择${name}?`,
      zIndex: 200
    }).then(() => {
      wx.setStorageSync('pwcompanyid', id)
      wx.setStorageSync('pwcompanyname', name)
      this.setData({ showCompany: false, company: name })
    }).catch(() => { })
  },
  onClose () {
    this.setData({ showCompany: false })
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
    let name = wx.getStorageSync('pwcompanyname')
    this.setData({
      username: '',
      password: '',
      company: name || '空'
    })

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