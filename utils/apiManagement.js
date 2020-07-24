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
const   f_ordermyOrder  = params => api._get("order/myOrder", params); 
const   f_orderinfo  = params => api._get("order/info", params); 
const   p_ordercancel  = params => api._post("order/cancel", params); 
const   p_guestpassword  = params => api._post("guest/password", params); 
// 登录注册
const p_guestregister = params => api._post("guest/register", params);
const f_guestsmsCode = params => api._get("guest/smsCode", params);
const f_noticeGetInfo = params => api._get("notice/getInfo", params); // 用户须知

// 基本信息
const f_companyInfo = params => api._get("company/info", params);
// 预约
const getTickets = params => api._get("order/remain", params);
const getTicketInfo = params => api._get("order/ticketInfo", params);

// 上传
const   upload  = params => api._upload("file/upload", params); //  上传   

// 导出接口
module.exports = {
        login,
        p_guestregister,
        f_guestsmsCode,
        f_noticeGetInfo,
        upload,
        f_ordermyOrder,
        f_orderinfo,
        p_ordercancel,
        p_guestpassword,
        f_companyInfo,
        getTickets,
        getTicketInfo,
        f_guestbaseInfo,
        p_guestavatar,
        f_orderlist,
}