/*
*   文章相关请求模块
 */
import request from '@/utils/request'
//获取文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        params
        //Body参数用data设置
        //Query参数用params设置
        //headers参数用headers设置
    })
}
//获取文章频道
export const getArticleChannels = () => {
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels'
    })
}
//删除文章
export const delArticle = articleId =>{
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/articles/${articleId}`
    })
}

//创建文章
export const addArticle = (data,draft=false) =>{
    return request({
        method: 'POST',
        url: '/mp/v1_0/articles',
        params: {
            draft//是否存为草稿（true为存入）
        },
        data
    })
}
//修改文章
export const updateArticle = (articleId,data,draft=false) =>{
    return request({
        method: 'PUT',
        url: `/mp/v1_0/articles/${articleId}`,
        params: {
            draft
        },
        data
    })
}
//获取指定文章
export const getArticle = articleId =>{
    return request({
        method: 'GET',
        url: `/mp/v1_0/articles/${articleId}`
    })
}