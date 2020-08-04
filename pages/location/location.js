var api = require('../../utils/apiManagement.js');
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
Page({
  data: {
    Height: 0,
    scale: 13,
    latitude: "",
    longitude: "",
    markers: [],

  },
  // 点击获取坐标
  getClickLocation(event) {
    // this.setData({
    //   markers: [{
    //     id: 2,
    //     latitude: event.detail.latitude,
    //     longitude: event.detail.longitude,
    //     width: 25,
    //     height: 25,
    //     iconPath: "../../icons/位置.png"
    //   }]
    // })
  },
  // 博物馆位置
  museumLoc() {
    api.f_companyInfo().then(res => {
      if (res.data.code == 200) {
        if (!res.data.datas.longitude || !res.data.datas.latitude) {
          Toast.fail('该博物馆暂未设置经纬度');
        } else {
          this.setData({
            latitude: res.data.datas.longitude,
            longitude: res.data.datas.latitude,
            markers: [{
              id: 2,
              latitude: res.data.datas.longitude,
              longitude: res.data.datas.latitude,
              width: 25,
              height: 25,
              iconPath: "../../icons/位置.png"
            }]
          })
        }

      }
    })
  },
  // 当前位置
  curLoc() {
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          // markers: [{
          //   id: 1,
          //   latitude: res.latitude,
          //   longitude: res.longitude,
          //   width: 25,
          //   height: 25,
          //   iconPath: "../../icons/位置.png",
          //   title: "当前位置"
          // }]
        })
      }
    })
  },

  go() {
    api.f_companyInfo().then(res => {
      if (res.data.code == 200) {
        if (!res.data.datas.longitude || !res.data.datas.latitude) {
          Toast.fail('该博物馆暂未设置经纬度');
        } else {
          // this.setData({
          //   latitude: res.data.datas.longitude,
          //   longitude: res.data.datas.latitude,
          // })
          wx.openLocation({
            latitude: Number(res.data.datas.longitude),
            longitude: Number(res.data.datas.latitude),
            name: "博物馆",
            address: "博物馆地址",
            success: function (r) {
              console.log(r)
            }
          })
        }
      }
    })   
  },

  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      }
    })

    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // console.log(res)
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          // markers: [{
          //   id: 1,
          //   latitude: res.latitude,
          //   longitude: res.longitude,
          //   width: 25,
          //   height: 25,
          //   iconPath: "../../icons/位置.png",
          //   title: "当前位置"
          // }],
        })
      }
    })

  },

  regionchange(e) {
    // console.log("regionchange===" + e.type)
  },

  //点击merkers
  markertap(e) {
    let _this = this;
    console.log(e.markerId)

    wx.showActionSheet({
      itemList: ["出发"],
      success: function (res) {
        // let lat = _this.data.markers[0].latitude
        // let lon = _this.data.markers[0].longitude
        let lat = Number(_this.data.latitude)
        let lon = Number(_this.data.longitude)
        wx.openLocation({
          latitude: lat,
          longitude: lon,
          name: "博物馆",
          address: "博物馆地址",
          success: function (r) {
            console.log(r)
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    // console.log("scale===" + this.data.scale)
    if (e.controlId === 1) {
      // if (this.data.scale === 13) {
      that.setData({
        scale: --this.data.scale
      })
      // }
    } else {
      //  if (this.data.scale !== 13) {
      that.setData({
        scale: ++this.data.scale
      })
      // }
    }

  },

})