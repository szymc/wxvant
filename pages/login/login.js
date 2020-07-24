var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    fileurl:'',
    totle:'',
    reserved:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params ={
    }
    api.f_guestbaseInfo(params).then(res => {
      this.setData({ 
        fileurl:res.data.datas.avatar,
        name:res.data.datas.name
      });
    }).catch(e => {
      Toast(e.errMsg);
    })
    api.f_orderlist(params).then(res => {
      this.setData({ 
        totle:res.data.datas.total,
      });
    }).catch(e => {
      Toast(e.errMsg);
    })
    api.f_ordermyOrder(params).then(res => {
      this.setData({ 
        reserved:res.data.datas.total,
      });
    }).catch(e => {
      Toast(e.errMsg);
    })
  },
  cancel(){
    Dialog.confirm({
    title: '提示',
    message: '将退出登录, 是否继续?',
  })
    .then(() => {
      wx.removeStorage({
        key: 'token',
        success (res) {
          console.log(res)
        }

      })
      wx.redirectTo({
        url: '/pages/userLogin/userLogin',
        success: function(res){
          // success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    })
    .catch(() => {
      
    });
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