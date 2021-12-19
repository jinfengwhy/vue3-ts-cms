import { createApp } from 'vue'
import { globalRegister } from './global'

import './service/axios_demo'
import { BASE_URL, BASE_NAME } from './service/request/config'

import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)
app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')

// 测试代码：
console.log(`---BASE_URL: `, BASE_URL)
console.log(`---BASE_NAME: `, BASE_NAME)
console.log(`---BASE LINE: `, process.env.VUE_APP_BASE_LINE)
