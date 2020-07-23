var  api=require('../utils/baseApi.js')
//  api_post  post 请求方式

//  api._upload  upload 请求方式        

//  api._delete delete 请求方式

//  api._get get 请求方式

/*注意  post 请求方式

        get 请求方式     

        delete 请求方式

        所带的参数 形式如下
        params={
            name：'聂康乔'
                .
                .
                .
        }
*/
//编写请求接口的地址
const   login  = params => api._post("guest/login", params); 
const   f_guestbaseInfo  = params => api._get("guest/baseInfo", params); 
const   f_orderlist  = params => api._get("order/list", params); 
const   imgUpload  = params => api._upload("file/upload", params); 
const   p_guestavatar  = params => api._post("guest/avatar", params); 


// 导出接口
module.exports = {
        login,
        f_guestbaseInfo,
        imgUpload,
        p_guestavatar,
        f_orderlist
}