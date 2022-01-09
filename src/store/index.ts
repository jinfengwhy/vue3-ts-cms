import { createStore, Store, useStore as useStoreVuex } from 'vuex'

import { pageListReq } from '@/service/main/system/system'

import login from './login/login'
import system from './main/system/system'
import { IRootState, IStateType } from './type'

const store = createStore<IRootState>({
  state() {
    return {
      counter: 100,
      depList: [],
      roleList: []
    }
  },
  // 第一个入参：state，第二个入参：payload
  mutations: {
    changeDepList(state, list) {
      state.depList = list
    },
    changeRoleList(state, list) {
      state.roleList = list
    }
  },
  // 第一个入参：context(store实例)，第二个入参：payload
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色的列表信息
      const depResult = await pageListReq(`/department/list`, {
        offset: 0,
        size: 100
      })
      const { list: depList } = depResult.data
      const roleResult = await pageListReq(`/role/list`, {
        offset: 0,
        size: 100
      })
      const { list: roleList } = roleResult.data

      // 2.提交到store中
      commit('changeDepList', depList)
      commit('changeRoleList', roleList)
    }
  },
  // 模块
  modules: {
    login,
    system
  }
})

// 将缓存中的信息加载到vuex中
export function setupStore(): void {
  store.dispatch('login/loadLoginAction')
  store.dispatch('getInitialDataAction')
}

// 定义自己的useStore函数
export function useStore(): Store<IStateType> {
  return useStoreVuex()
}

export default store
