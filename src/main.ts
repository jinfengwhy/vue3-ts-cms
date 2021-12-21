import { createApp } from 'vue'
import { globalRegister } from './global'

// import './service/axios_demo'
import jfwRequest from './service'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)
app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')

// 测试代码：
type DataType = {
  data: any
  returnCode: string
  success: boolean
}
jfwRequest
  .get<DataType>({
    url: '/home/multidata',
    interceptors: {
      requestInterceptors: (config) => {
        console.log(`---单次请求: 请求拦截成功`)
        return config
      },
      responseInterceptors: (res) => {
        console.log(`---单次请求: 响应拦截成功`)
        return res
      }
    }
  })
  .then((res) => {
    console.log(`---res get: `, res)
  })
