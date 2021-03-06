import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
var api = require('../../utils/apiManagement.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    subscribeDate: '选择日期',
    show: false,
    isCalendar: false,
    minDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    time1: '请选择时间段',
    time2: '请选择时间段',
    remain1: 0,
    remain2: 0,
    MonTicketId: -1,
    AftTicketId: -1,
    radio: '0',
    timeSlice1: '00:00-00:00',
    timeSlice2: '00:00-00:00',
    isGotoreinformation: true,
    visitResult: [],
    visitList: []
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
    let params = {
      date: String(new Date(this.formatDate(event.detail)))
    }
    api.getTickets(params).then(res => {
      this.setData({
        show: false,
        subscribeDate: this.formatDate(event.detail),
        isCalendar: true,
      })
      if (res.data.code == 200) {
        this.setData({
          time1: `剩余票数${Number(res.data.datas[0])}张`,
          time2: `剩余票数${Number(res.data.datas[1])}张`,
          remain1: Number(res.data.datas[0]),
          remain2: Number(res.data.datas[1]),
          MonTicketId: res.data.datas2,
          AftTicketId: res.data.datas3
        });
      }
    })
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
  // 获取景点
  getVisits() {
    let params = {
      companyId: wx.getStorageSync('pwcompanyid')
    }
    api.f_companyVisit(params).then(res => {
      // console.log(res)
      if (res.data.code == 200) {
        this.setData({
          visitList: res.data.datas
        })
      }
    }).catch(() => {})
  },
  // 选择景点
  onChangeVisit(event) {
    this.setData({
      visitResult: event.detail
    })
  },
  // toggleVisit(event) {
  //   const { id } = event.currentTarget.dataset;
  //   this.setData({
  //     visitResult: id,
  //   })
  // },
  // 预约
  gotoreinformation() {
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
    let radio;
    if (this.data.radio == 1) {
      radio = 0
    } else if (this.data.radio == 2) {
      radio = 1
    }
    if (this.data.visitResult.length == 0) {
      Toast.fail('尚未选择任何景点');
      return
    }
    let params = {
      id: this.data.id,
      newDate: this.data.subscribeDate,
      choose: radio,
      scene: this.data.visitResult
    }
    api.update_endorse(params).then(res => {
      if (res.data.code == 200) {
        wx.showLoading({
          title: '改签成功',
        })
        setTimeout(function () {
          wx.navigateBack({         //返回上一页  
            delta: 1
          })
        }, 500)
      }
      else if (res.data.code == 1100) {
        wx.showModal({
          title: '改签失败',
          content: res.data.message
        })
      }
    }).catch(e => {
      wx.showLoading({
        title: res.data.message,
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
    })
  },
  noop() { },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.ticketInfo()
    this.getVisits()
  },



  ticketInfo() {
    api.getTicketInfo().then(res => {
      // console.log(res)
      this.setData({
        timeSlice1: res.data.datas.duration1,
        timeSlice2: res.data.datas.duration2,
        maxDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * res.data.datas.advance).getTime()
      })
      if (res.data.datas.ticketMax <= 0) {
        this.setData({
          isGotoreinformation: false
        })
      }
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