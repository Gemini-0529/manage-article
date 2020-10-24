/**
 * 基于axios的请求模块
 */
import axios from 'axios'

//创建一个axios实例
//配置，将来发请求直接写参数，会自动拼接baseurl地址
//复制一个axios，不同的axios实例可以有不同的配置
const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})
export default request
