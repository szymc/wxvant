import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import { AreaList } from '../../utils/area'
import { isCellphone, CheckIdCard } from '../../utils/util'
var api = require('../../utils/apiManagement.js');
Page({

/**
 * 页面的初始数据
 */
	data: {
		name:'',
		userid:'',
		age:'',
		sex:'',
		job:'',
		area:'',
		imgshow: false,
		fileurl:'',
		phone: '',
	},
	gotoModifyinformation(){
		wx.navigateTo({
			url: '/pages/Modifyinformation/Modifyinformation',
		})
	},

	showimg() {
		this.setData({ imgshow: true });
	},
	onCloseimgshow() {
		this.setData({ imgshow: false });
	  },
	afterRead(uploadFile) {
		api.upload(uploadFile).then(res => {
			var  data= JSON.parse(res.data)
			let params={
				avatar:data.datas
			}
			
			api.p_guestavatar(params).then(res => {
				this.setData({ 
					fileurl:data.datas,
					imgshow: false
					});
			}).catch(e => {

			})
		}).catch(e => {
		})

	},

	clickpic(){
    var that = this;
    wx.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
				// 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
				console.log(res)
        var filePath = res.tempFilePaths[0];
        //将刚才选的照片/拍的 放到下面view视图中
        
        api.upload(filePath).then(res => {
					var  data= JSON.parse(res.data)
					let params={
						avatar:data.datas
					}
					api.p_guestavatar(params).then(res => {
						that.setData({ 
							fileurl:data.datas,
							imgshow: false
							});
					}).catch(e => {
						Toast(e.errMsg);
					})
				}).catch(e => {
					Toast(e.errMsg);
				})
      },
      fail: function (error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function () {

      }
    });
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
	let params ={
	}
	api.f_guestbaseInfo(params).then(res => {
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
		let catimg=""
		if(res.data.datas.avatar!=''){
			this.setData({
				fileurl:res.data.datas.avatar,
			})
		}else{
			this.setData({
				fileurl:'../../icons/cat.jpg',
			})
		}
		let arr = JSON.parse(res.data.datas.region)
		this.setData({ 
			
			name:res.data.datas.name,
			phone:res.data.datas.phone,
			age:res.data.datas.age,
			userid:res.data.datas.idNo,
			sex:sexname,
			job:jobname,
			area:arr
		});
	}).catch(e => {
		Toast(e.errMsg);
	})
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