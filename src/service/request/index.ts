import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { JFWRequestInterceptors, JFWRequestConfig } from './type'
import { injectGlobalInterceptors } from './interceptor'

const DEFAULT_LOADING = false

class JFWRequest {
  public instance: AxiosInstance
  public interceptors?: JFWRequestInterceptors
  public isShowLoading: boolean

  constructor(config: JFWRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.interceptors = config.interceptors
    this.isShowLoading = config.isShowLoading ?? DEFAULT_LOADING

    // 单个实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    // 所有实例的拦截器
    injectGlobalInterceptors.call(this)
  }

  request<T>(config: JFWRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单次请求的请求成功拦截
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      // 单次请求可以设置isShowLoading
      this.isShowLoading = config.isShowLoading ?? DEFAULT_LOADING
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次请求的响应成功拦截
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          // 单次请求完成后重置isShowLoading
          this.isShowLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          // 单次请求失败的情况下也需要重置isShowLoading
          this.isShowLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: JFWRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T>(config: JFWRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  patch<T>(config: JFWRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }

  delete<T>(config: JFWRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default JFWRequest
