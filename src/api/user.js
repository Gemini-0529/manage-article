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
export const getUserProfile = () => {
    return request({
        method: 'get',
        url:'mp/v1_0/user/profile',
        headers: {//设置请求头。用户令牌
            Authorizations:'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzUwNjY0NzksInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.fckw7o0QhbLZEUel0tTLSe2kgyBQkU-lWUntyJ_Si-g'
        }
    })
}
//  修改用户信息