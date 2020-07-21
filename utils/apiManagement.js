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
const login  = params => api._post("guest/login", params); 


// 导出接口
module.exports = {
    login
}