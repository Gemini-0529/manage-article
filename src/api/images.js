/**
 * 素材
 */

import request from '@/utils/request'
//上传图片
export const uploadImage = data =>{
    return request({
        method: 'POST',
        url: '/mp/v1_0/user/images',
        data
        //文件上传的接口都要求把请求头中的Content-Type设置为
        //multiparty/form-data，但是我们使用axios上传文件
        //不需要手动设置，给data一个FormData即可
    })
}

//获取素材
export const getImages = params =>{
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/images',
        params
    })
}