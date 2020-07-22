var api = require('../../utils/baseApi.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import { AreaList } from '../../utils/area'

Page({

/**
 * 页面的初始数据
 */
	data: {
		name:'张三啊',
		userid:"360103199910310049",
		age:'21岁',
		imgshow: false,
		sexshow: false,
		sex:'无',
		sexactions: [
		  {
			name: '男',
		  },
		  {
			name: '女',
		  }
		],
		jobshow: false,
		job:'无',
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
		regionshow:false,
		area: '请选择地区',
		areaCode: [],
		areaList:AreaList,
		fileurl:'https://img.yzcdn.cn/vant/cat.jpeg',
		//   fileList: [
		// 	{
		// 		url: 'https://img.yzcdn.cn/vant/cat.jpeg'
		// 	},
		//   ],
	},
	showname(){
		Toast(`用户姓名不可修改`);
	},
	showuserid(){
		Toast(`证件号码不可修改`);
	},
	showage(){
		Toast(`年龄不可修改`);
	},
	showsex(){
		this.setData({ sexshow: true });
	},
	onClosesexshow() {
		this.setData({ sexshow: false });
	},
	onSelectsexshow(event) {
		console.log(event.detail.name);
		this.setData({
			sex:event.detail.name
		})
		//用onLoad周期方法重新加载，实现当前页面的刷新
		this.onLoad()
	},
	showjob(){
		this.setData({ jobshow: true });
	},
	onClosejobshow() {
		this.setData({ jobshow: false });
	},
	onSelectjobshow(event) {
		console.log(event.detail.name);
		this.setData({
			job:event.detail.name
		})
	},
	showregion() {
		this.setData({ regionshow: true });
	},
	onConfirm(event) {
		// const { picker, value, index } = event.detail;
		// picker.setColumnValues(1, citys[value[0]]);
		const areaValues = event.detail.values
		console.log(areaValues);
		let arr = [areaValues[0].name, areaValues[1].name, areaValues[2].name]
		let arrcode = [areaValues[0].code, areaValues[1].code, areaValues[2].code]
		this.setData({ 
			area : arr,
			regionshow: false,
			areaCode: arrcode
		})
	},
	onCancel() {
		this.setData({ regionshow: false });
	},
	showimg() {
		this.setData({ imgshow: true });
	},
	onCloseimgshow() {
		this.setData({ imgshow: false });
	  },
	afterRead(uploadFile) {
		api._upload('file/upload',uploadFile).then(res => {
			console.log(res.data)
			var  data= JSON.parse(res.data)
			console.log(data.datas)
			// const {fileList} = this.data
			// fileList.push({ url: data.datas});
			// console.log(fileList)
			this.setData({ 
				fileurl:data.datas,
				imgshow: false
				});
		}).catch(e => {
		console.log(e)
		})
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