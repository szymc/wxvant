var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabledata:[],
    pageIndex:1,    //展示的当前页码
    pageSize: 10,   //每页加载的数据量（使用的json数据就是40条，实际工作根据需求来）
    pageCount:2,    //总页数(假设的，实际应该是根据后台返回的数据)
  },
  
  nextPage: function () {
    var that = this
    let page = this.data.pageIndex;
    console.log("第" + page + "页滑到底部了,请求第" + (page + 1) + "页");
    page += 1;
    if(page<=this.data.pageCount){
        let params ={
          pageNo:page
        }
        api.f_orderlist(params).then(res => {
              var newtempList = res.data.datas
                let newlistArr=[]
                newtempList.records.forEach(element => {
                  if(element.status == 1){
                    newlistArr.push(
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
                    newlistArr.push(
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
                    newlistArr.push(
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
                    newlistArr.push(
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
                pageIndex: newtempList.currentPage,
                pageCount:newtempList.pages,
                pageSize:newtempList.pageSize,
                tabledata:this.data.tabledata.concat(newlistArr),
              })
        }).catch(e => {
          Toast(e.errMsg);
        })
      }else{
        Toast.fail('没有更多数据了')
      }
  },
  onLoad: function (options) {
    var that = this
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
            pageIndex: tempList.currentPage,
            pageCount:tempList.pages,
            pageSize:tempList.pageSize,
            tabledata:listArr,
          })
    }).catch(e => {
      Toast(e.errMsg);
    })
  }
})