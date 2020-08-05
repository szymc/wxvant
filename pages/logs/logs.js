var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({

  data: {
   lists: [],
   page: 1,
   pageCount:3, 
   pageSize: 10,
  },
  //监听是否滑到底部
  nextPage: function () {
    var that = this
  //  let new_lists = [];
   let page = this.data.page;

  //  let startindex = page * 10 + 1;
  //  console.log("第" + page + "页滑到底部了,请求第" + (page + 1) + "页");
   page += 1;
   if(page<=this.data.pageCount){
        let params ={
          pageNo:page
        }
        api.f_orderlist(params).then(res => {
          debugger
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
                page: newtempList.currentPage,
                  pageCount:newtempList.pages,
                  pageSize:newtempList.pageSize,
                lists:this.data.lists.concat(newlistArr),
              })
            
            
        }).catch(e => {
          Toast(e.errMsg);
        })
      }else{
        Toast.fail('没有更多数据了')
      }
   //模拟请求
  //  for (let i = startindex; i <= startindex + 9; i++) {
  //   new_lists.push(i);
  //  }
  //  this.setData({ lists: this.data.lists.concat(new_lists), page: page });
  },

  onLoad: function (options) {
    var that = this
    that.setData({
      lists: []
    })
    let params ={
      pageNo:this.data.page
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
            page: tempList.currentPage,
            pageCount:tempList.pages,
            pageSize:tempList.pageSize,
            lists:listArr,
          })
    }).catch(e => {
      Toast(e.errMsg);
    })


  //  let lists = [];
   //模拟请求
  //  for (let i = this.data.page; i <= this.data.page + 9; i++) {
  //   lists.push(i)
  //  }
  //  this.setData({ lists: lists, });
  },
 })