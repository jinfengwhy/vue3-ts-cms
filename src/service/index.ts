import JFWRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const jfwRequest = new JFWRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      console.log(`---单个实例: 请求拦截成功`)
      return config
    },
    requestInterceptorsCatch: (err) => {
      console.log(`---单个实例: 请求拦截失败`)
      return err
    },
    responseInterceptors: (res) => {
      console.log(`---单个实例: 响应拦截成功`)
      return res
    },
    responseInterceptorsCatch: (err) => {
      console.log(`---单个实例: 响应拦截失败`)
      return err
    }
  }
})

// 测试代码
const jfwRequest2 = new JFWRequest({
  baseURL: BASE_URL
})
setTimeout(() => {
  jfwRequest2.request({
    url: '/home/multidata',
    method: 'GET'
  })
}, 3 * 1000)

export default jfwRequest
