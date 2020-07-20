
const baseUrl = 'http://192.168.4.220:8082/api/'//	正式
 
const http = ({ url = '', param = {} ,contentType,...other } = {}) => {
    const token = wx.getStorageSync('token');
    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            data: param,
            ...other,
            header: {
				'sys-token': token,
				'content-type': contentType 
            },
            success: function(res) {
		
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
 
const _post = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'post',
        contentType:"application/x-www-form-urlencoded"
    })
}
 
const _put = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'put',
        contentType:"application/x-www-form-urlencoded"
    })
}
const _delete = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'post',
        contentType:"application/x-www-form-urlencoded"
    })
}
const _dowm = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'post',
        contentType:"application/x-www-form-urlencoded"
    })
}
module.exports = {
    baseUrl,
    _get,
    _post,
    _put,
    _delete,
}