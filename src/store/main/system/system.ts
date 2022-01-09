import { Module } from 'vuex'

import { pageListReq, pageDelDataReq } from '@/service/main/system/system'

import { IRootState } from '@/store/type'
import { ISystemState } from './type'

const system: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: []
    }
  },
  getters: {
    tableList(state) {
      return (pageName: string) => (state as any)[`${pageName}List`]
    },
    totalCount(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`]
    }
  },
  mutations: {
    changeUsersList(state, usersList) {
      state.usersList = usersList
    },
    changeUsersCount(state, count) {
      state.usersCount = count
    },
    changeRoleList(state, roleList) {
      state.roleList = roleList
    },
    changeRoleCount(state, count) {
      state.roleCount = count
    },
    changeGoodsList(state, goodsList) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, count) {
      state.goodsCount = count
    },
    changeMenuList(state, menuList) {
      state.menuList = menuList
    }
  },
  actions: {
    async pageListAction({ commit }, payload) {
      // 1.根据pageName拼接url
      const pageName = payload.pageName
      const url = `/${pageName}/list`

      // 2.根据url请求数据
      const result = await pageListReq(url, payload.queryInfo)
      const { list, totalCount } = result.data

      // 3.提交到仓库中
      const _upperFirstLetter = (str: string) => {
        if (str.length) {
          return str.charAt(0).toUpperCase() + str.slice(1)
        }
      }
      commit(`change${_upperFirstLetter(pageName)}List`, list)
      if (!['menu'].includes(pageName)) {
        commit(`change${_upperFirstLetter(pageName)}Count`, totalCount)
      }
    },

    pageDelDataAction(context, payload) {
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      return pageDelDataReq(url)
    }
  }
}

export default system
