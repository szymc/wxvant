// pages/userinformation/userinformation.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

const citys = {
	浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
	福建: ['福州', '厦门', '莆田', '三明', '泉州'],
  };
Page({

/**
 * 页面的初始数据
 */
	data: {
		name:'张三啊',
		userid:"360103199910310049",
		age:'21岁',
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
		columns: [
			{
			  values: Object.keys(citys),
			  className: 'column1',
			},
			{
			  values: citys['浙江'],
			  className: 'column2',
			  defaultIndex: 2,
			},
		],
		areaList:{
			province_list: {
			  110000: '北京市',
			  120000: '天津市'
			},
			city_list: {
			  110100: '北京市',
			  110200: '县',
			  120100: '天津市',
			  120200: '县'
			},
			county_list: {
			  110101: '东城区',
			  110102: '西城区',
			  110105: '朝阳区',
			  110106: '丰台区',
			  120101: '和平区',
			  120102: '河东区',
			  120103: '河西区',
			  120104: '南开区',
			  120105: '河北区',
			  // ....
			}
		  },
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
		const { picker, value, index } = event.detail;
		// picker.setColumnValues(1, citys[value[0]]);
		console.log(event.detail);

		this.setData({ regionshow: false });
	},
	
	onCancel() {
		this.setData({ regionshow: false });
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