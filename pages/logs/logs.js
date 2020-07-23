var api = require('../../utils/apiManagement.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr:[],     //数据集合
    pageIndex:1,    //展示的当前页码
    pageSize: 40,   //每页加载的数据量（使用的json数据就是40条，实际工作根据需求来）
    pageCount:3,    //总页数(假设的，实际应该是根据后台返回的数据)

  },
  //加载初始页数据
  loadInitData(){
    var that = this
    // var pageIndex = 1
    // if (that.data.pageIndex === 1){
    //   wx.showLoading({
    //     title: '加载中...',
    //   })
    // }
    // 刷新时，清空listArr，防止新数据与原数据冲突
    that.setData({
      listArr: []
    })


    let params ={
      pageNo:this.data.pageIndex
    }
    api.f_orderlist(params).then(res => {
      console.log(res.data.datas)
          var tempList = res.data.datas
          that.setData({
            pageIndex: tempList.pages,
            pageCount:tempList.total,
            pageSize:tempList.pageSize,
            listArr:tempList.records,
          })
    }).catch(e => {
      console.log(e)
    })
  },

  //加载更多
  loadMore(){
    var that = this
    var pageIndex = that.data.pageIndex
    pageIndex += 1
    wx.showLoading({
      title: '加载第'+ pageIndex +'页',
    })
    let params ={
      pageNo:pageIndex
    }
    api.f_orderlist(params).then(res => {
      //将新一页的数据添加到原数据后面
      let newList = res.data.data;
      that.setData({
        pageIndex: pageIndex,
        ['listArr[' + (pageIndex - 1) + ']'] : newList
      })
      console.log(that.data.listArr)
    }).catch(e => {
      console.log(e)
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadInitData()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this
    that.loadInitData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that= this,
        pageIndex = that.data.pageIndex,
        pageCount = that.data.pageCount;
    //当页面小于总页数时加载下页面
    if(pageIndex < pageCount){
      that.loadMore()
    }else{
      wx.showToast({
        title: '没有更多数据了',
      })
    }
  }

})