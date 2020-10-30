/**
 * 基于axios的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'

//创建一个axios实例
//配置，将来发请求直接写参数，会自动拼接baseurl地址
//复制一个axios，不同的axios实例可以有不同的配置
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基础路径
    //定制后端返回的原始数据的处理
    //参数 data 就是后端返回地原始数据
    transformResponse: [function (data) {
      // Do whatever you want to transform the data
      //后端返回地数据可能不是json格式字符串，如果不是的话，调用JSONbig.parse(data)会报错
      try {
        //如果转换成功，返回结果
        return JSONbig.parse(data)
      } catch(err) {
        //如果失败，返回原始数据
        return data
      }
      
    }]
})

//请求拦截器
request.interceptors.request.use(
    // 任何所有请求会经过这里
    // config 是当前请求相关的配置信息对象,是可以修改的
    function (config) {
      const user = JSON.parse(window.localStorage.getItem('user'))
      // 如果有登录用户信息，则统一设置 token
      if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
      }
      // 然后我们就可以在允许请求出去之前定制统一业务功能处理
      // 例如：统一的设置 token
      // 当这里 return config 之后请求在会真正的发出去
      return config
    },
    // 请求失败，会经过这里
    function (error) {
      return Promise.reject(error)
    }
  )

export default request