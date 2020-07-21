// pages/upload/upload.js
var api = require('../../utils/baseApi.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: []
  },
  // },
  afterRead(uploadFile) {
    const token = wx.getStorageSync('token');
    return new Promise((resolve, reject) => {

      wx.chooseImage({
        success: function (res) {
          console.log('临时路径：' + res.tempFilePaths[0])
              wx.uploadFile({
                url: 'http://192.168.4.220:8082/api/guest/avatar',
                filePath: uploadFile.detail.file.path, 
                name: 'file',
                header: {
                  'sys-token': token,
          
                      },
                success: function (result) {
                  console.log("返回路径：" + result.data)
                }

              })
        },
      })
  
    //   wx.uploadFile({
    //     url: 'http://192.168.4.220:8082/api/guest/avatar', // 上传的服务器接口地址
    //     filePath: uploadFile.detail.file.path, 
    //     name: 'file', //上传的所需字段，后端提供
    //     header: {
    //       'sys-token': token,
  
    //           },
    //     success: (res) => {
    //       // 上传完成操作
    //     console.log(res)
    //       resolve(res)
    //     },
    //     fail: (err) => {
    //       //上传失败：修改pedding为reject
    //       reject(err)
    //     }
    //   });
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