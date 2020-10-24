/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
//  用户登录
export const userLogin = data => {
    return request({
        method: 'POST',
        url: "mp/v1_0/authorizations",
        //设置post请求主体
        data
    })
}

//  获取用户信息

//  修改用户信息