import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import { AreaList } from '../../utils/area'
var api = require('../../utils/apiManagement.js');
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
		const areaValues = event.detail.values
		let arr = [areaValues[0].name, areaValues[1].name, areaValues[2].name]
		let arrcode = [areaValues[0].code, areaValues[1].code, areaValues[2].code]
		console.log(arr);
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
		api.upload(uploadFile).then(res => {
			console.log(res.data)
			var  data= JSON.parse(res.data)
			console.log(11)
			console.log(data.datas)
			console.log(22)
			let params={
				avatar:data.datas
			}
			api.p_guestavatar(params).then(res => {
				console.log(res)
				this.setData({ 
					fileurl:data.datas,
					imgshow: false
					});
			}).catch(e => {
			console.log(e)
			})
		}).catch(e => {
		console.log(e)
		})

	},
/**
 * 生命周期函数--监听页面加载
 */
onLoad: function (options) {
	let params ={
	}
	api.f_guestbaseInfo(params).then(res => {
		console.log(res.data.datas)
		let sexname=""
		if(res.data.datas.sex == 0){
			sexname="男"
		}else if(res.data.datas.sex == 1){
			sexname="女"
		}else{
			sexname="保密"
		}
		let jobname=""
		if(res.data.datas.job == 1){
			jobname="在职"
		}else if(res.data.datas.job == 2){
			jobname="小学"
		}else if(res.data.datas.job == 3){
			jobname="中学"
		}else if(res.data.datas.job == 4){
			jobname="大学"
		}else{
			jobname="其他"
		}
		let arr = JSON.parse(res.data.datas.region)
		console.log(arr)
		this.setData({ 
			fileurl:res.data.datas.avatar,
			name:res.data.datas.name,
			age:res.data.datas.age,
			userid:res.data.datas.idNo,
			sex:sexname,
			job:jobname,
			area:arr
		});
	}).catch(e => {
		Toast(e.errMsg);
		console.log(e)
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