/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
//  用户登录
export const userLogin = data => {
    return request({
        method: 'POST',
        url: "/mp/v1_0/authorizations",
        //设置post请求主体
        data
    })
}

//  获取用户信息
export const getUserProfile = () => {
    //将存在localstorage中的user数据提取，并转为JSON对象
    // const user = JSON.parse(window.localStorage.getItem('user'))
    return request({
        method: 'GET',
        url:'/mp/v1_0/user/profile'
        // headers: {//设置请求头。用户令牌。拦截器中统一设置，这里不需要设置了
        //     Authorizations:`Bearer ${user.token}`
        // }
    })
}
//  修改用户信息
export const updateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: '/mp/v1_0/user/profile',
        data
    })
}

//修改用户头像
export const updateImage = data => {
    return request({
        method: 'PATCH',
        url: '/mp/v1_0/user/photo',
        data
    })
}