// pages/changepassword/changepassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expassword:'',
    newpassword:'',
    repassword:'',
    expasswordmessage:"",
    acc_expassword:'',
    newpasswordmessage:"",
    acc_newpassword:'',
    repasswordmessage:"",
    acc_repassword:'',
  },
  expasswordchange: function (event){
    const expassword = event.detail || event;
    let message = '';
    if(expassword){
      if(/^.{6,20}$/.test(expassword)){
        message = '';
      }else{
        message = '密码长度为6-20位';
      }
    }else{
      message = '原密码不能为空';
    };
    this.setData({
      expasswordmessage:message,
      acc_expassword: expassword,
    });
  },
  newpasswordchange: function (event){
    const newpassword = event.detail || event;
    let message = '';
    if(newpassword){
      if(/^.{6,20}$/.test(newpassword)){
        message = '';
      }else{
        message = '密码长度为6-20位';
      }
    }else{
      message = '原密码不能为空';
    };
    this.setData({
      newpasswordmessage:message,
      acc_newpassword: newpassword,
    });
  },
  repasswordchange: function (event){
    const repassword = event.detail || event;
    let message = '';
    if(repassword){
      if(/^.{6,20}$/.test(repassword)){
        message = '';
        if(repassword != this.data.acc_newpassword){
          message = '两次输入密码不一致!';
        }
      }else{
        message = '密码长度为6-20位';
      }
    }else{
      message = '原密码不能为空';
    };
    this.setData({
      repasswordmessage:message,
      acc_repassword: repassword,
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