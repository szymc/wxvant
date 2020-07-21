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
    time1: '请选择时间段',
    time2: '请选择时间段',
    remain1: 0,
    remain2: 500,
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
      isCalendar: true,
      time1: `剩余票数${this.data.remain1}张`,
      time2: `剩余票数${this.data.remain2}张`,
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
      if (this.data.remain1 == 0) {
        Toast.fail('该时间段暂无票，请重新选择');
        return
      }
      timeSlice = this.data.timeSlice1
    } else if (this.data.radio == 2) {
      if (this.data.remain2 == 0) {
        Toast.fail('该时间段暂无票，请重新选择');
        return
      }
      timeSlice = this.data.timeSlice2
    }
    wx.navigateTo({ url: `/pages/subscribe/subscribe?date=${this.data.subscribeDate}&radio=${this.data.radio}&timeSlice=${timeSlice}`})
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