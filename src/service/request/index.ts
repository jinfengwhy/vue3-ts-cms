import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { JFWRequestConfig } from './type'
import { injectGlobalInterceptors } from './interceptor'

class JFWRequest {
  public instance: AxiosInstance
  constructor(config: JFWRequestConfig) {
    this.instance = axios.create(config)

    // 单个实例的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptors,
      config.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptors,
      config.interceptors?.responseInterceptorsCatch
    )

    // 所有实例的拦截器
    injectGlobalInterceptors.call(this)
  }

  request(config: JFWRequestConfig): void {
    // 具体某个请求的拦截器
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptors) {
        res = config.interceptors.responseInterceptors(res)
      }
      console.log(`---res: `, res)
    })
  }
}

export default JFWRequest
