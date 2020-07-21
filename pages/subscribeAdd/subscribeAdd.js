// pages/subscribeAdd/subscribeAdd.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
		job:'请选择职业',
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
    // 表单验证
    nameMsg: ''
  },
  // 姓名
  onChangeName(event) {
    this.setData({name: event.detail})
  },
  blurName(event) {
    console.log(event)
    if (event.detail.value.length == 0) {
      this.setData({
        nameMsg: '用户姓名不能为空'
      })
    } else {
      this.setData({
        nameMsg: ''
      })
    }
  },
  showsexs() {
    this.setData({ showsex: true });
  },
  onClose() {
    this.setData({ showsex: false });
  },
  onSelect(event) {
    this.setData({
			sex:event.detail.name
		})
  },
  showjob(){
		this.setData({ jobshow: true });
	},
	onClosejobshow() {
		this.setData({ jobshow: false });
	},
	onSelectjobshow(event) {
		this.setData({
			job:event.detail.name
		})
  },
  cmdSubmit() {
    // console.log(this.data.name)
    // if (this.data.name.length == 0) {
    //   Toast.fail('用户姓名不能为空');
    //   return
    // }
    console.log('su')
    // wx.navigateBack()
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