var api = require('../utils/baseApi.js')
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
const   p_guestavatar  = params => api._post("guest/avatar", params); 

// 登录注册
const p_guestregister = params => api._post("guest/register", params);
const f_guestsmsCode = params => api._get("guest/smsCode", params);
const f_noticeGetInfo = params => api._get("notice/getInfo", params); // 用户须知

// 基本信息
const f_companyInfo = params => api._get("company/info", params);
// 预约


// 
const   upload  = params => api._upload("file/upload", params); //  上传                       


// 导出接口
module.exports = {
        login,
        p_guestregister,
        f_guestsmsCode,
        f_noticeGetInfo,
        f_companyInfo,
        f_guestbaseInfo,
        p_guestavatar,
        f_orderlist,
        upload
}