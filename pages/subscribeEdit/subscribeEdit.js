// pages/subscribeEdit/subscribeEdit.js
var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import { isCellphone, CheckIdCard } from '../../utils/util'
import { AreaList } from '../../utils/area'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    idNo: '',
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
    phone: '',
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
    countyCode: '',
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
      area: arr,
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
    if (!(/^[\u4e00-\u9fa5]{2,6}$/.test(this.data.name))) {
      this.setData({nameMsg: '用户姓名输入有误'})
    }
    if (this.data.nameMsg.length > 0) return
  
    if (this.data.idNo.length == 0) {
      Toast.fail('证件号码不能为空');
      return
    }
    if (CheckIdCard(this.data.idNo) != 2) {
      this.setData({cardMsg: '请输入正确的证件号码格式'})
    }
    if (this.data.cardMsg.length > 0) return

    if (this.data.sex == '男' || this.data.sex == '女' || this.data.sex == '保密') {
      this.setData({sexChoose: true})
    }
    if (!this.data.sexChoose) {
      Toast.fail('请选择性别');
      return
    }

    if (this.data.phone.length == 0) {
      Toast.fail('手机号码不能为空');
      return
    }
    if (!isCellphone(this.data.phone)) {
      this.setData({phoneMsg: '请输入正确的手机格式'})
    }
    if (this.data.phoneMsg.length > 0) return

    if (this.data.job != '请选择职业') {
      this.setData({jobChoose: true})
    }
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

    let params = {
      id: this.data.id,
      name: this.data.name,
      idNo: this.data.idNo,
      sex: sex,
      phone: this.data.phone,
      job: job,
      province: this.data.areaCode[0],
      city: this.data.areaCode[1],
      district: this.data.areaCode[2]
    }
    api.contactsModify(params).then(res => {
      if (res.data.code == 200) {
        Toast({
          duration: 1000,
          type: 'success',
          message: '提交成功',
          onClose: () => {
            this.getData()
            wx.navigateBack()
          },
        });
      } else {
        Toast.fail(res.data.message);
      }
    }).catch(e => {
      console.log(e)
    })
  },

  // 加载数据
  getData() {
    let params = {
      id: this.data.id
    }
    api.f_contactsinfo(params).then(res => {
      if (res.data.code == 200) {

        let sex = '';
        if (res.data.datas.sex == 0) {
          sex = '男'
        } else if (res.data.datas.sex == 1) {
          sex = '女'
        } else if (res.data.datas.sex == 2) {
          sex = '保密'
        }

        let job = '';
        if (res.data.datas.job == 1) {
          job = '在职'
        } else if (res.data.datas.job == 2) {
          job = '小学'
        } else if (res.data.datas.job == 3) {
          job = '中学'
        } else if (res.data.datas.job == 4) {
          job = '大学'
        } else if (res.data.datas.job == 5) {
          job = '其他'
        } 

        let areacodeArr = [res.data.datas.province, res.data.datas.city, res.data.datas.district]
        let arrName = ''
        if (res.data.datas.province != null && res.data.datas.province.length > 0) {
          if (res.data.datas.city != null && res.data.datas.city.length > 0) {
            if (res.data.datas.district != null && res.data.datas.district.length > 0) {
              arrName = `${AreaList.province_list[res.data.datas.province]},${AreaList.city_list[res.data.datas.city]},${AreaList.county_list[res.data.datas.district]}`
              this.setData({
                areaCode: areacodeArr,
                countyCode: res.data.datas.district
              })
            }
          }
        } else {
          arrName = '请选择地区'
        }

        this.setData({
          name: res.data.datas.name,
          idNo: res.data.datas.idNo,
          sex: sex,
          phone: res.data.datas.phone,
          job: job,
          area: arrName
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
    this.getData();
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