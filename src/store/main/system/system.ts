import { Module } from 'vuex'

import { pageListReq } from '@/service/main/system/system'

import { IRootState } from '@/store/type'
import { ISystemState } from './type'

const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0
    }
  },
  getters: {
    tableList(state) {
      return (pageName: string) => (state as any)[`${pageName}List`]
    }
  },
  mutations: {
    changeUsersList(state, payload) {
      state.usersList = payload
    }
  },
  actions: {
    async pageListAction({ commit }, payload) {
      // 1.根据pageName拼接url
      const pageName = payload.pageName
      const url = `/${pageName}/list`

      // 2.根据url请求数据
      const result = await pageListReq(url, payload.queryInfo)
      const { list } = result.data

      // 3.提交到仓库中
      const _upperFirstLetter = (str: string) => {
        if (str.length) {
          return str.charAt(0).toUpperCase() + str.slice(1)
        }
      }
      commit(`change${_upperFirstLetter(pageName)}List`, list)
    }
  }
}

export default system
