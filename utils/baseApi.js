const baseUrl = 'http://192.168.4.220:8082/api/'//	192 
const http = ({ url = '', param = {} ,contentType,...other } = {}) => {
    const token = wx.getStorageSync('token');
    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            data: param,
            ...other,
            header: {
				// 'sys-token': token,
				'sys-token': '484096081668476928',
				'content-type': contentType 
            },
            success: function(res) {
            //   console.log(res.data.msg)
                if(res.data.code==1102){
                    wx.showModal({
                        title: '登录提示',
                        content: '您尚未登录，是否立即登录？',
                        showCancel: true,
                        confirmText: '登录',
                        success: (e) => {
                            if (e.confirm) {
                                wx.navigateTo({
                                    url: '/pages/userLogin/userLogin'
                                })
                            }
                        },
                        fail: () => {},
                    })
                }
                resolve(res)
			},
			fail: function(err) {
				reject(err)
			}
        })
    })
}
const getUrl = (url) => {
    if (url.indexOf('://') == -1) {
        url = baseUrl + url;
    }
    return url
}
// get方法

const _get = (url, param = {}) => {

    return http({
        url,
        param,
        method: 'get',
        contentType:"application/x-www-form-urlencoded"
    })
}

//  post方法 

const _post = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'post',
        contentType:"application/x-www-form-urlencoded"
    })
}

//  delete方法

const _delete = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'post',
        contentType:"application/x-www-form-urlencoded"
    })
}

// 上传方法

const _upload = (url, file) => {
    console.log(file)
        const token = wx.getStorageSync('token');
        return new Promise((resolve, reject) => {
            wx.uploadFile({
                url: getUrl(url), // 上传的服务器接口地址
                filePath: file.detail.file.path, 
                name: 'file', //上传的所需字段，后端提供
                header: {
                  'sys-token': token,
                      },
                success: function (res) {
                 console.log(res)
                    resolve(res)
                }
            })
        })
    }

module.exports = {
    baseUrl,
    _get,    
    _post,
    _delete,
    _upload
}