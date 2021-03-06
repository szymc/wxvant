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
const f_companyList = params => api._get("company/choose", params);
const f_companyVisit = params => api._get("company/visit", params);
const f_companyIntro = params => api._get("company/intro", params);
// 预约
const getTickets = params => api._get("order/remain", params);
const getTicketInfo = params => api._get("order/ticketInfo", params);
const f_contactslist = params => api._get("contacts/list", params);
const f_contactsinfo = params => api._get("contacts/info", params);
const contactsModify = params => api._post("contacts/modify", params);
const contactsAdd = params => api._post("contacts/add", params);
const contactsEel = params => api._post("contacts/del", params);
const orderSave = params => api._post("order/save", params);

// 上传
// const   upload  = params => api._upload("file/upload", params); //  上传   

//  改签   

const update_endorse = params => api._post("order/endorse", params);                       

// 
const   upload  = params => api._upload("file/upload", params); //  上传                       
const   p_introductiongetAllIntrduction  = params => api._post("introduction/getAllIntrduction", params); 
const   p_guestcomplete  = params => api._post("guest/complete", params); 
// 导出接口
module.exports = {
        login,
        p_guestregister,
        f_guestsmsCode,
        f_noticeGetInfo,
        f_ordermyOrder,
        f_orderinfo,
        p_ordercancel,
        p_guestpassword,
        f_companyInfo,
        f_companyList,
        f_companyVisit,
        f_companyIntro,
        getTickets,
        getTicketInfo,
        f_guestbaseInfo,
        p_guestavatar,
        f_orderlist,
        update_endorse,
        f_contactslist,
        f_contactsinfo,
        contactsModify,
        contactsAdd,
        contactsEel,
        orderSave,
        upload,
        p_introductiongetAllIntrduction,
        p_guestcomplete
}