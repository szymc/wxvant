// pages/subscribeAdd/subscribeAdd.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import { isCellphone, CheckIdCard } from '../../utils/util'
import { AreaList } from '../../utils/area'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '张三',
    idNo: '360111199511280997',
    sex: '请选择性别',
    showsex: false,
    actionssex: [
      {
        name: '男',
      },
      {
        name: '女',
      },
      {
        name: '保密',
      },
    ],
    phone: '13122222222',
    jobshow: false,
    job: '请选择职业',
    jobactions: [
      {
        name: '在职',
      },
      {
        name: '小学',
      },
      {
        name: '中学',
      },
      {
        name: '大学',
      },
      {
        name: '其他',
      }
    ],
    area: '请选择地区',
    areaCode: [],
    showAreaSelect: false,
    areaList: AreaList,
    // 表单验证
    nameMsg: '',
    cardMsg: '',
    sexChoose: false,
    phoneMsg: '',
    jobChoose: false
  },
  // 姓名
  onChangeName(event) {
    this.setData({ name: event.detail })
  },
  blurName(event) {
    const name = event.detail.value;
    let message = '';
    if (name.length == 0) {
      message = '用户姓名不能为空'
    } else if (!(/^[\u4e00-\u9fa5]{2,6}$/.test(name))) {
      message = '用户姓名输入有误'
    }
    this.setData({
      nameMsg: message
    })
  },
  // 身份证
  onChangeCard(event) {
    this.setData({ idNo: event.detail })
  },
  blurCard(event) {
    const card = event.detail.value;
    let message = '';
    if (card.length == 0) {
      message = '证件号码不能为空'
    } else if (CheckIdCard(card) != 2) {
      message = '请输入正确的证件号码格式'
    }
    this.setData({
      cardMsg: message
    })
  },
  // 性别
  showsexs() {
    this.setData({ showsex: true });
  },
  onClose() {
    this.setData({ showsex: false });
  },
  onSelect(event) {
    this.setData({
      sex: event.detail.name,
      sexChoose: true
    })
  },
  // 手机
  onChangePhone(event) {
    this.setData({ phone: event.detail })
  },
  blurPhone(event) {
    const phone = event.detail.value;
    let message = '';
    if (phone.length == 0) {
      message = '手机号码不能为空'
    } else if (!isCellphone(phone)) {
      message = '请输入正确的手机格式'
    }
    this.setData({
      phoneMsg: message
    })
  },
  // 职业
  showjob() {
    this.setData({ jobshow: true });
  },
  onClosejobshow() {
    this.setData({ jobshow: false });
  },
  onSelectjobshow(event) {
    this.setData({
      job: event.detail.name,
      jobChoose: true
    })
  },
  // 地区
  showarea() {
    this.setData({ showAreaSelect: true })
  },
  onCloseArea() {
    this.setData({ showAreaSelect: false })
  },
  confirmArea(event) {
    // console.log(event.detail.values)
    const areaValues = event.detail.values
    let arr = [areaValues[0].name, areaValues[1].name, areaValues[2].name]
    let arrcode = [areaValues[0].code, areaValues[1].code, areaValues[2].code]
    this.setData({ 
      area : arr,
      areaCode: arrcode
    })
    this.onCloseArea()
  },
  closeArea() {
    this.onCloseArea()
  },
  // 确认
  cmdSubmit() {
    if (this.data.name.length == 0) {
      Toast.fail('用户姓名不能为空');
      return
    }
    if (this.data.nameMsg.length > 0) return

    if (this.data.idNo.length == 0) {
      Toast.fail('证件号码不能为空');
      return
    }
    if (this.data.cardMsg.length > 0) return

    if (!this.data.sexChoose) {
      Toast.fail('请选择性别');
      return
    }

    if (this.data.phone.length == 0) {
      Toast.fail('手机号码不能为空');
      return
    }
    if (this.data.phoneMsg.length > 0) return

    if (!this.data.jobChoose) {
      Toast.fail('请选择职业');
      return
    }

    let sex = 2;
    if (this.data.sex == '男') {
      sex = 0
    } else if (this.data.sex == '女') {
      sex = 1
    } else {
      sex = 2
    }

    let job = '5'
    if (this.data.job == '在职') {
      job = '1'
    } else if (this.data.job == '小学') {
      job = '2'
    } else if (this.data.job == '中学') {
      job = '3'
    } else if (this.data.job == '大学') {
      job = '4'
    } else {
      job = '5'
    }

    // console.log(this.data.name)
    // console.log(this.data.idNo)
    // console.log(sex)
    // console.log(this.data.phone)
    // console.log(job)
    // console.log(this.data.areaCode)

    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(AreaList)
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