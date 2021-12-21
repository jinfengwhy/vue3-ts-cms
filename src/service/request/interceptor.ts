import JFWRequest from '.'

// 所有实例的拦截器，单独提取为一个方法
export function injectGlobalInterceptors(this: JFWRequest) {
  this.instance.interceptors.request.use(
    (config) => {
      console.log(`---全局: 请求拦截成功`)
      return config
    },
    (err) => {
      console.log(`---全局: 请求拦截失败`)
      return err
    }
  )
  this.instance.interceptors.response.use(
    (res) => {
      console.log(`---全局: 响应拦截成功`)
      return res
    },
    (err) => {
      console.log(`---全局: 响应拦截失败`)
      return err
    }
  )
}
