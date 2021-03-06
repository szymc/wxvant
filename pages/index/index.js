var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    logo: '',
    banner: '',
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
    timeSlice1: '',
    timeSlice2: '',
    isGotoreinformation: true,
    showCompany: false,
    companyList: []
  },
  onDisplay () {
    var token = wx.getStorageSync('token');
    // console.log(token)
    if (token == '') {
      Toast.fail("您尚未登录，请先登录")
    } else {
      this.setData({ show: true });
    }
  },
  onClose () {
    this.setData({ show: false });
  },
  formatDate (date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm (event) {
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
  onChange (event) {
    this.setData({
      radio: event.detail,
    });
  },
  onClick (event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
    });
  },
  // 预约
  gotoreinformation () {
    var token = wx.getStorageSync('token');
    api.f_contactslist().then(res => {
      if (res.data.code == 1100) {
        Dialog.confirm({
          message: '为了确保预约门票时信息完善，请前往个人中心完善用户基本信息',
        }).then(() => {
          wx.navigateTo({
            url: '/pages/Modifyinformation/Modifyinformation'
          })
        }).catch(() => {
          // on cancel
        });;
      } else if (token != '') {
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
  noop () { },

  ticketInfo () {
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
  // 加载博物馆数据
  getCompanys () {
    api.f_companyList().then(res => {
      if (res.data.code == 200) {
        this.setData({
          companyList: res.data.datas
        })
      } else {
        Toast.fail(res.data.message || '博物馆查询失败')
      }
    }).catch(err => { })
  },
  cmdConfirm (event) {
    let id = event.currentTarget.dataset.id
    let name = event.currentTarget.dataset.name
    Dialog.confirm({
      message: `是否确认选择${name}?`,
      zIndex: 200
    }).then(() => {
      wx.setStorageSync('pwcompanyid', id)
      wx.setStorageSync('pwcompanyname', name)
      this.setData({ showCompany: false })
      this.onShow()
    }).catch(() => { })
  },
  clkIcon() {
    this.setData({ showCompany: true })
  },
  // 重置data数据
  resetData () {
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
    var token = wx.getStorageSync('token');
    var id = wx.getStorageSync('pwcompanyid');
    // console.log(token)
    if (token == '') {
      // console.log('token')
    } else {
      api.f_contactslist().then(res => {
        if (res.data.code == 1100) {
          Dialog.confirm({
            message: '为了确保预约门票时信息完善，请前往个人中心完善用户基本信息',
          }).then(() => {
            wx.navigateTo({
              url: '/pages/Modifyinformation/Modifyinformation'
            })
          })
            .catch(() => {
              // on cancel
            });
        }
      });
    };
    this.getCompanys()
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
    var token = wx.getStorageSync('token');
    let id = wx.getStorageSync('pwcompanyid')
    if (id) {
      this.resetData()
      let params = {
        companyId: id
      }
      api.f_companyInfo(params).then(res => {
        // console.log(res)
        this.setData({
          logo: res.data.datas.logo,
          banner: res.data.datas.banner
        })
      });
    } else {
      this.setData({ showCompany: true })
    }
    if (token == '') {

    } else {
      this.ticketInfo()
    }
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