import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface JFWRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (res: T) => T
  responseInterceptorsCatch?: (err: any) => any
}

export interface JFWRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: JFWRequestInterceptors<T>
  isShowLoading?: boolean
}
