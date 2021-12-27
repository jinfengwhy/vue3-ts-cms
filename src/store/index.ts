import { createStore } from 'vuex'

import login from './login/login'
import { IRootSate } from './type'

const store = createStore<IRootSate>({
  state() {
    return {
      counter: 100
    }
  },
  // 第一个入参：state，第二个入参：payload
  mutations: {},
  // 第一个入参：context(store实例)，第二个入参：payload
  actions: {},
  // 模块
  modules: {
    login
  }
})

// 将缓存中的信息加载到vuex中
export function setupStore(): void {
  store.dispatch('login/loadLoginAction')
}

export default store
