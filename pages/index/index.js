var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    logo: 'admin',
    banner: '123456',
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
    isGotoreinformation: true
  },
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
      if (res.data.code == 200) {
        // console.log(res)
        this.setData({
          time1: `剩余票数${Number(res.data.datas[0])}张`,
          time2: `剩余票数${Number(res.data.datas[1])}张`,
          remain1: Number(res.data.datas[0]),
          remain2: Number(res.data.datas[1]),
          MonTicketId: res.data.datas2,
          AftTicketId: res.data.datas3
        });
        this.setData({
          show: false,
          subscribeDate: this.formatDate(event.detail),
          isCalendar: true,
        })
      } else if (res.data.code == 1100) {
        Toast.fail(res.data.message)
      } else {
        this.setData({
          time1: '请选择时间段',
          time2: '请选择时间段',
          remain1: 0,
          remain2: 0,
          MonTicketId: -1,
          AftTicketId: -1,
        })
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
  // 预约
  gotoreinformation() {
    api.f_contactslist().then(res => {
      if (res.data.code == 1100) {
        Dialog.alert({
          message: '为了确保预约门票时信息完善，请前往个人中心完善用户基本信息',
        }).then(() => {
          // on close
        });
      } else {
        if (!this.data.isGotoreinformation) {
          Toast.fail('当前已超过单人可预约最大数量，请处理其他票务预约后再来预约');
          return
        }
        if (!this.data.isCalendar) {
          Toast.fail('请选择一个日期');
          return
        }
        if (this.data.radio == 0) {
          Toast.fail('请选择一个时间段');
          return
        }
        let timeSlice;
        let TicketId;
        if (this.data.radio == 1) {
          if (this.data.remain1 == 0) {
            Toast.fail('该时间段暂无票，请重新选择');
            return
          }
          timeSlice = this.data.timeSlice1
          TicketId = this.data.MonTicketId
        } else if (this.data.radio == 2) {
          if (this.data.remain2 == 0) {
            Toast.fail('该时间段暂无票，请重新选择');
            return
          }
          timeSlice = this.data.timeSlice2
          TicketId = this.data.AftTicketId
        }
        wx.navigateTo({ url: `/pages/subscribe/subscribe?date=${this.data.subscribeDate}&TicketId=${TicketId}&timeSlice=${timeSlice}` })

      }
    });
  },
  noop() { },

  ticketInfo() {
    api.getTicketInfo().then(res => {
      // console.log(res)
      if (res.data.code == 200) {
        this.setData({
          timeSlice1: res.data.datas.duration1,
          timeSlice2: res.data.datas.duration2,
          maxDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * (res.data.datas.advance - 1)).getTime()
        })
        if (res.data.datas.ticketMax <= 0) {
          this.setData({
            isGotoreinformation: false
          })
        }
      }
    })
  },
  // 重置data数据
  resetData() {
    this.setData({
      subscribeDate: '选择日期',
      isCalendar: false,
      time1: '请选择时间段',
      time2: '请选择时间段',
      remain1: 0,
      remain2: 0,
      MonTicketId: -1,
      AftTicketId: -1,
      radio: '0',
      isGotoreinformation: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.f_contactslist().then(res => {
      if (res.data.code == 1100) {
        Dialog.alert({
          message: '为了确保预约门票时信息完善，请前往个人中心完善用户基本信息',
        }).then(() => {
          // on close
        });
      }
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
    this.resetData()
    api.f_companyInfo().then(res => {
      this.setData({
        logo: res.data.datas.logo,
        banner: res.data.datas.banner
      })
    });
    this.ticketInfo()
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