var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params ={
    }
    api.f_guestbaseInfo(params).then(res => {
      console.log(res.data.datas)
      
      // this.setData({ 
      //   fileurl:res.data.datas.avatar,
      //   name:res.data.datas.name,
      //   age:res.data.datas.age,
      //   userid:res.data.datas.idNo,
      //   sex:sexname,
      //   job:jobname,
      //   area:arr
      // });
    }).catch(e => {
      Toast(e.errMsg);
      console.log(e)
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