// pages/subscribe/subscribe.js
var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hostid: '',
    subscribeDate: '2020.01.01',
    timeSlice: '00:00-00:00',
    ticketId: -1,
    total: 0,
    show: false,
    choose: 0,
    max: 3,
    ticketMax: 0,
    list1: [],
    list2: [],
    result: [],
    visitResult: [],
    visitList: []
  },

  choosePerson() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  cancel() {
    this.setData({ show: false });
  },
  submitChoose() {
    if (this.data.visitResult.length == 0) {
      Toast.fail('至少选择一个景点');
      return
    }
    if (this.data.result.length == 0) {
      Toast.fail('至少选择一个参观人员');
      return
    }
    let listarr = []
    if (this.data.list2.length > 0) {
      this.data.list2.forEach(item => {
        if (this.data.result.includes(String(item.id))) {
          listarr.push(item)
        }
      })
    }
    this.setData({
      show: false,
      list1: listarr
    });
  },
  add() {
    wx.navigateTo({ url: '/pages/subscribeAdd/subscribeAdd' })
  },
  onChange(event) {
    // console.log(event.detail)
    this.setData({
      result: event.detail
    });
  },
  // 点击单元格触发
  toggle(event) {
    // console.log(event)
    // 单元格绑定选中状态
    // const { index } = event.currentTarget.dataset;
    // const checkbox = this.selectComponent(`.checkboxes-${index}`);
    // checkbox.toggle();
  },
  noop() {

  },
  onChangeVisit(event) {
    this.setData({
      visitResult: event.detail
    })
  },
  noopVisit() { },
  edit(evnet) {
    let id = evnet.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/subscribeEdit/subscribeEdit?id=${id}` })
  },
  delete(evnet) {
    let id = evnet.currentTarget.dataset.id
    Dialog.confirm({
      message: '是否确定删除?',
    }).then(() => {
      let params = {
        id: id
      }
      api.contactsEel(params).then(res => {
        if (res.data.code == 200) {
          Toast.success('删除成功');
          this.getContactsData()
        } else {
          Toast.fail(res.data.message);
        }
      })
    }).catch(() => {

    });
  },
  cmdSubmit() {
    if (this.data.visitResult.length == 0) {
      Toast.fail('尚未选择任何景点');
      return
    }
    if (this.data.result.length == 0) {
      Toast.fail('请至少选择一个人员');
      return
    }
    let params = {
      ticketId: Number(this.data.ticketId),
      visitorIds: this.data.result,
      scene: this.data.visitResult
    }
    api.orderSave(params).then(res => {
      if (res.data.code == 200) {
        wx.navigateTo({url: '/pages/subscribeSuccess/subscribeSuccess'})
      } else {
        Toast.fail(res.data.message)
      }
    })
  },
  // 获取游客列表
  getContactsData() {
    api.f_contactslist().then(res => {
      if (res.data.code == 200) {
        let listArr = res.data.datas2
        listArr.unshift(res.data.datas)
        this.setData({
          hostid: res.data.datas.id,
          list2: listArr
        })
      }

    })
  },
  ticketInfo() {
    api.getTicketInfo().then(res => {
      // console.log(res)
      if (res.data.code == 200) {
        this.setData({
          ticketMax: res.data.datas.ticketMax
        })
      }
    })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      subscribeDate: options.date,
      ticketId: options.TicketId,
      timeSlice: options.timeSlice
    })
    this.ticketInfo()
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
    this.getContactsData()
    this.getVisits()
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