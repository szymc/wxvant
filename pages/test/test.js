<<<<<<< HEAD

var api = require('../../utils/baseApi.js');
Page({
  data: {
    name: '',
    pwd: '',
    register:'',
  },
formSubmit: function (e) {       
    //  post 的请求方式
             let   params=
              {phone:'聂康乔',
              password:'123456'
              }
        api._post('guest/login',params).then(res => {
          console.log(res.data.datas)
          wx.setStorage({
            key: 'token',
            data: res.data.datas
          })
        }).catch(e => {
          console.log(e)
        })
        
    //  删除的方法
        // let   params=
        //       {id:"1"
        //       }
        // api._post('contacts/del',params).then(res => {
        //   console.log(res.data.datas)
        //   wx.setStorage({
        //     key: 'token',
        //     data: res.data.datas
        //   })
        // }).catch(e => {
        //   console.log(e)
        // })
        // let   params={}
        // api._get('order/ticketInfo',params).then(res => {
        //   console.log(res.data)
        // })
  }
})
=======
>>>>>>> test
