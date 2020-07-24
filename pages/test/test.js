Page({
	/**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,         //列表初始页
    list: [],            //存放所有数据   
  },
  //加载初始数据；单独写个方法，而不直接写在onLoad里面，是因为如果要做下拉刷新操作的话，只需要在触发下拉刷新操作后，再调用一下这个方法就可以了。
  loadInitData() {
    var that = this
    var pageIndex = 1
    var msg = '加载第' + pageIndex + '页'
    wx.showLoading({
      title: msg,
    })
    wx.request({
      url: 'http://192.168.4.220:8082/api/order/myOrder',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      data:{
      },
      success: function (res) {
        console.log(res)
        that.setData({
          pageIndex: pageIndex,
          list: res.data.data
        })
        console.log(that.data.list)
      },
      fail: function (res) { },
      complete: function (res) {
        wx.hideLoading()
      },
    })
  },
  //加载更多
  loadMore() {
    let that = this,
        pageIndex = that.data.pageIndex;  // 获取当前页码
    pageIndex += 1;   //加载当前页的下一页
    let msg = '加载第' + pageIndex + '页';
    wx.showLoading({
        title: msg,
    })
    wx.request({
      url: 'xxx.com/Content/test-data/data.json',

      header: { 'content-type': 'application/json' },

      method: 'GET',

      success: function (res) {

        //将新一页的数据添加到原数据后面
        let data = res.data.data;

        let originList = that.data.list;

        let newList = originList.concat(data)

        console.log(newList)
        that.setData({
          pageIndex: pageIndex,
          list: newList
        })
      },
      fail: function (res) { },
      complete: function (res) {
        wx.hideLoading()
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    that.loadInitData();
  },
/**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('触发下拉刷新')
    var that = this
    that.loadInitData()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('触发上拉加载')
    var that = this
    that.loadMore()
  }
})