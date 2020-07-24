var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      qrCode:"",
      visitDate:"",
      orderNo:"",
      duration:"",
      companyName:"",
      position:"",
      barCode:"",
      companyPhone:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params ={
      id:options.ticketscoding
    }
    api.f_orderinfo(params).then(res => {
      this.setData({ 
        qrCode:res.data.datas.qrCode,
        visitDate:res.data.datas.visitDate,
        orderNo:res.data.datas.orderNo,
        duration:res.data.datas.duration,
        companyName:res.data.datas.companyName,
        position:res.data.datas.position,
        barCode:res.data.datas.barCode,
        companyPhone:res.data.datas.companyPhone,
      });
    }).catch(e => {
      Toast(e.errMsg);
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