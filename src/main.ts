import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 注册vue-router插件
app.use(router)

// 挂载dom
app.mount('#app')
