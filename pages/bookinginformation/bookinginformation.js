var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabledata:[
      {
        id:1,
        name:'张三啊',
        idNo:'360103199910310049',
        phone:'18702695874',
        visitDate:'2020-07-20 14：00-17：30',
        status:"弃票",
        color:"red"
      },
      {
        id:2,
        name:'张三啊',
        idNo:'360103199910310049',
        phone:'18702695874',
        visitDate:'2020-07-20 14：00-17：30',
        status:"已使用",
        color:"#323233"
      },
      {
        id:3,
        name:'张三啊',
        idNo:'360103199910310049',
        phone:'18702695874',
        visitDate:'2020-07-20 14：00-17：30',
        status:"待使用",
        color:"#1AAD19"
      },
      {
        id:1,
        name:'张三啊',
        idNo:'360103199910310049',
        phone:'18702695874',
        visitDate:'2020-07-20 14：00-17：30',
        status:"弃票",
        color:"red"
      }
    ],
    pageIndex:1,    //展示的当前页码
    pageSize: 40,   //每页加载的数据量（使用的json数据就是40条，实际工作根据需求来）
    pageCount:3,    //总页数(假设的，实际应该是根据后台返回的数据)
  },
  
  //加载初始页数据
  loadInitData(){
    var that = this
    // 刷新时，清空listArr，防止新数据与原数据冲突
    that.setData({
      tabledata: []
    })
    let params ={
      pageNo:this.data.pageIndex
    }
    api.f_orderlist(params).then(res => {
          var tempList = res.data.datas
          let listArr=[]
          tempList.records.forEach(element => {
            if(element.status == 1){
              listArr.push(
                {
                "id":element.id,
                "name":element.name,
                "idNo":element.idNo,
                "phone":element.phone,
                "visitDate":element.visitDate,
                "status":'待使用',
                "color":"#1AAD19"}
                )
            }else if(element.status==2){
              listArr.push(
                {
                "id":element.id,
                "name":element.name,
                "idNo":element.idNo,
                "phone":element.phone,
                "visitDate":element.visitDate,
                "status":'已使用',
                "color":"#1296DB"}
                )
            }else if(element.status==3){
              listArr.push(
                {
                "id":element.id,
                "name":element.name,
                "idNo":element.idNo,
                "phone":element.phone,
                "visitDate":element.visitDate,
                "status":'弃票',
                "color":"red"}
                )
            }else if(element.status==4){
              listArr.push(
                {
                "id":element.id,
                "name":element.name,
                "idNo":element.idNo,
                "phone":element.phone,
                "visitDate":element.visitDate,
                "status":'取消预约',
                "color":"#323233"}
                )
            }
          });
          that.setData({
            pageIndex: tempList.pages,
            pageCount:tempList.total,
            pageSize:tempList.pageSize,
            tabledata:listArr,
          })
    }).catch(e => {
      Toast(e.errMsg);
    })
  },

  //加载更多
  loadMore(){
    var that = this
    var pageIndex = that.data.pageIndex
    pageIndex += 1
    // wx.showLoading({
    //   title: '加载第'+ pageIndex +'页',
    // })
    let params ={
      pageNo:pageIndex
    }
    api.f_orderlist(params).then(res => {
      //将新一页的数据添加到原数据后面
      let newList = res.data.data;
      that.setData({
        pageIndex: pageIndex,
        ['tabledata[' + (pageIndex - 1) + ']'] : newList
      })
    }).catch(e => {
      Toast(e.errMsg);
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