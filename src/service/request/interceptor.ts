/**
 * 全局的拦截器做了哪些事情？
 *   1. 添加了isShowLoading
 *   2. 针对axios返回结果中的status做了不同处理
 *   3. 针对axios返回的结果做了过滤，直接返回res.data
 */

import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import JFWRequest from '.'

// 所有实例的拦截器，单独提取为一个方法
export function injectGlobalInterceptors(this: JFWRequest): void {
  let loadingInstance: ILoadingInstance

  this.instance.interceptors.request.use(
    (config) => {
      if (this.isShowLoading) {
        loadingInstance = ElLoading.service({
          text: '加载中...',
          background: 'rgba(0, 0, 0, 0.5)'
        })
      }
      return config
    },
    (err) => {
      console.log(`---全局: 请求拦截失败`)
      return err
    }
  )
  this.instance.interceptors.response.use(
    (res) => {
      if (this.isShowLoading) {
        loadingInstance.close()
      }
      const status = res.status
      switch (status) {
        case 200: {
          // console.log(`---status: 200`)
          break
        }
        case 403: {
          console.log(`---status: 404: unauthorization`)
          break
        }
        case 404: {
          console.log(`---status: 404: Not Found`)
          break
        }
        case 500: {
          console.log(`---status: 500: Internal Server Error`)
          break
        }
      }
      return res.data
    },
    (err) => {
      console.log(`---全局: 响应拦截失败`)
      return err
    }
  )
}
