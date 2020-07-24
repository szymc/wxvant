var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabledata:[],
    queryBean:'',
    queryList:'',
  },
  gotocheck(event){
  	var index = event.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/ticketdetails/ticketdetails?ticketscoding='+ index,})
  },
  changetick(event){
    console.log
    var index = event.currentTarget.dataset.id
    console.log(index)
    wx.navigateTo({
      url: '/pages/reinformation/reinformation?id='+ index
    })
  },
  go_update(){

  },
  cancel(event){
    var index = event.currentTarget.dataset.id
    Dialog.confirm({
    title: '提示',
    message: '将取消此次预约, 是否继续?',
  })
    .then(() => {
      let params ={
        id:index
      }
      api.p_ordercancel(params).then(res => {
        Toast(res.data.message);
        this.onLoad()
      }).catch(e => {
        Toast(e.errMsg);
      })
    })
    .catch(() => {
      
    });
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
    let params ={
    }
    api.f_ordermyOrder(params).then(res => {
      this.setData({ 
        tabledata:res.data.datas.records,
      });
    }).catch(e => {
      Toast(e.errMsg);
      console.log(e)
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