// pages/myreservation/myreservation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabledata:[
      {
        id:'1',
        noid:"NO.123456789",
        name:'张三啊',
        cardid:'360103199910310049',
        phone:'18702695874',
        visitiedata:'2020-07-20 14：00-17：30',
      },
      {
        id:'2',
        noid:"NO.123456789",
        name:'张三啊',
        cardid:'360103199910310049',
        phone:'18702695874',
        visitiedata:'2020-07-20 14：00-17：30',
      },
      {
        id:'3',
        noid:"NO.123456789",
        name:'张三啊',
        cardid:'360103199910310049',
        phone:'18702695874',
        visitiedata:'2020-07-20 14：00-17：30',
      },
    ]
  },
  gotocheck(){
    wx.navigateTo({ url: '/pages/ticketdetails/ticketdetails',})
  },
  changetick(){
    wx.navigateTo({
      url: '/pages/reinformation/reinformation'
    })
  },
  go_update(){
    console.log('我更新啦')
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