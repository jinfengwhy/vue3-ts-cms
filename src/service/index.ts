import localCache from '@/utils/cache'

import JFWRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const jfwRequest = new JFWRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config) => {
      // 携带token
      const token = localCache.getItem('token') ?? ''
      if (!config.headers) {
        config.headers = {}
      }
      config.headers.Authorization = `Bearer ${token}`

      return config
    },
    requestInterceptorsCatch: (err) => {
      return err
    },
    responseInterceptors: (res) => {
      return res
    },
    responseInterceptorsCatch: (err) => {
      return err
    }
  }
})

// 测试代码
// const jfwRequest2 = new JFWRequest({
//   baseURL: BASE_URL
// })
// setTimeout(() => {
//   jfwRequest2.request({
//     url: '/home/multidata',
//     method: 'GET'
//   })
// }, 3 * 1000)

export default jfwRequest
