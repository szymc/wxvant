// Page({　data:{},
//   　changeAvatar:function(){
//       const _this = this;
//       wx.chooseImage({
//         count: 1,
//         sizeType: ['original', 'compressed'],
//         sourceType: ['album', 'camera'],
//         success(res) {
//           // tempFilePath可以作为img标签的src属性显示图片
//           const tempFilePath = res.tempFilePaths[0];
//           _this.setData({
//             personImage: tempFilePath
//           })
//           wx.uploadFile({
//              url: config.UPLOADFILE, //图片上传至开发服务器接口
//              filePath: tempFilePath,
//              name: 'file',
//              formData: {},
//              success(res) {
//                const data = res.data;
//                console.log(data);
//              }
//            })   
//         }
//       })
//     }
//   })