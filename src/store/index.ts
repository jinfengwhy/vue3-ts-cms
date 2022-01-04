import { createStore, Store, useStore as useStoreVuex } from 'vuex'

import login from './login/login'
import system from './main/system/system'
import { IRootState, IStateType } from './type'

const store = createStore<IRootState>({
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
    login,
    system
  }
})

// 将缓存中的信息加载到vuex中
export function setupStore(): void {
  store.dispatch('login/loadLoginAction')
}

// 定义自己的useStore函数
export function useStore(): Store<IStateType> {
  return useStoreVuex()
}

export default store
