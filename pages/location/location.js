
Page({
  data: {
    Height: 0,
    scale: 13,
    latitude: "",
    longitude: "",
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../../icons/减.png',
      position: {
        left: 300,
        top: 100 - 50,
        width: 30,
        height: 30
      },
      clickable: true
    },
    {
      id: 2,
      iconPath: '../../icons/加.png',
      position: {
        left: 330,
        top: 100 - 50,
        width: 30,
        height: 30
      },
      clickable: true
    }
    ],

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
        // console.log(res.latitude)
        // console.log(res.longitude)
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: "1",
            latitude: res.latitude,
            longitude: res.longitude,
            width: 25,
            height: 25,
            iconPath: "../../icons/位置.png",
            title: "当前位置"

          }],
        })
      }

    })

  },

  regionchange(e) {
    // console.log("regionchange===" + e.type)
  },

  //点击merkers
  markertap(e) {
    var _this = this;
    // console.log(e.markerId)

    wx.showActionSheet({
      itemList: ["出发"],
      success: function (res) {
        // console.log(res.tapIndex)
      },
      fail: function (res) {
        // console.log(res.errMsg)
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