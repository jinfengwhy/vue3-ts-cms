import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface JFWRequestInterceptors {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (res: any) => any
  responseInterceptorsCatch?: (err: any) => any
}

export interface JFWRequestConfig extends AxiosRequestConfig {
  interceptors?: JFWRequestInterceptors
  isShowLoading?: boolean
}
