import axios from 'axios'
import cookie from "js-cookie"
import { Message } from 'element-ui';

axios.defaults.withCredentials = true


const service = axios.create({
  baseURL: 'http://121.89.177.244:8888',
  timeout: 50000 ,// 默认请求超时时间
    crossDomain: true,

})

// request 拦截器
/**
 * request 拦截器
 * 可以在请求发送前对请求进行一些处理
 * 如：统一在请求头上加上token
 * 对请求参数进行统一加密
 * 等等
 */
service.interceptors.request.use(
  config => {
      if(cookie.get("token")){
          config.headers['token']=cookie.get('token')
      }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
/**
 * response 拦截器
 * 可以在接口响应之后，页面获取到响应结果之前
 * 对响应结果统一进行处理
 * 如：对返回结果进行解密
 */
service.interceptors.response.use(
  response => {
      const res=response.data
      if(res.code===20000){
          //code为200的情况表示接口是通的，直接返回res
          return res
      }else {
         Message({
             type:'error',
             message:res.msg
         })
          return Promise.reject(res.msg)
      }
  },
  error => {
      Message({
          type:'error',
          message:"异常请联系plxc"
      })
      return Promise.reject(error)
  }
)

export default service
