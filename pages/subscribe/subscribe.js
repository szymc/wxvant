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
    subscribeDate: '2020.7.20',
    timeSlice: '00:00-00:00',
    total: 0,
    show: false,
    choose: 0,
    max: 3,
    list1: [],
    list2: [{ id: 6, name: '张三', tel: '11122223365', no: '360103144478542269' }, { id: 1, name: '里斯啊', tel: '11122223365', no: '360103144478542269' }, { id: 4, name: '王二麻子', tel: '11122223365', no: '360103144478542269' }, { id: 2, name: 'dd', tel: '11122223365', no: '360103144478542269' }],
    result: []
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
  edit(evnet) {
    let id = evnet.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/subscribeEdit/subscribeEdit?id=${id}` })
  },
  delete(evnet) {
    let id = evnet.currentTarget.dataset.id
    // console.log(id)
    Dialog.confirm({
      message: '是否确定删除?',
    }).then(() => {
      // on close
    }).catch(() => {

    });
  },
  cmdSubmit() {
    console.log('11')
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      subscribeDate: options.date,
      radio: options.radio,
      timeSlice: options.timeSlice
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
    this.getContactsData()
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