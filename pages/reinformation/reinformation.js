import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subscribeDate: '选择日期',
    show: false,
    isCalendar: false,
    minDate: new Date(2020, 7, 1).getTime(),
    maxDate: new Date(2020, 7, 30).getTime(),
    radio: '0',
    timeSlice1: '9:00-10:00',
    timeSlice2: '13:00-17:00',
  },
  // 日历
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      subscribeDate: this.formatDate(event.detail),
      isCalendar: true
    });
  },
  // 时间段
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  // 预约
  gotoreinformation(){
    // console.log(this.data)
    if (!this.data.isCalendar) {
      Toast.fail('请选择一个日期');
      return
    }
    if (this.data.radio == 0) {
      Toast.fail('请选择一个时间段');
      return
    }
    let timeSlice;
    if (this.data.radio == 1) {
      timeSlice = this.data.timeSlice1
    } else if (this.data.radio == 2) {
      timeSlice = this.data.timeSlice2
    }

  let pages = getCurrentPages();   //获取小程序页面栈
  let beforePage = pages[pages.length -2];  //获取上个页面的实例对象
  beforePage.setData({      //直接修改上个页面的数据（可通过这种方式直接传递参数）
    txt:'修改数据了'
  })
  beforePage.go_update();   //触发上个页面自定义的go_update方法
  wx.navigateBack({         //返回上一页  
    delta:1
  })
  },
  gotoreturn(){
    wx.navigateBack({
      delta: 1
    })
  },
  noop() {},
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