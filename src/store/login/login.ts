import { Module } from 'vuex'

import { userLoginReq, userInfoReq, userMenusReq } from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'
import { IUserInfo } from '@/service/login/type'
import { ILoginState } from './type'
import { IRootSate } from '../type'

const loginMoudle: Module<ILoginState, IRootSate> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, payload: string) {
      state.token = payload
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload: Array<any>) {
      state.userMenus = payload
    }
  },
  actions: {
    async userLoginAction({ commit }, payload: IUserInfo) {
      // 1.验证用户名和密码
      const loginResult = await userLoginReq(payload)
      const { id, token } = loginResult.data
      localCache.setItem('token', token)
      commit('changeToken', token)

      // 2.请求用户基本信息
      const userInfoResult = await userInfoReq(id)
      const userInfo = userInfoResult.data
      localCache.setItem('userInfo', userInfo)
      commit('changeUserInfo', userInfo)

      // 3.根据用户角色请求菜单信息
      const userMenusResult = await userMenusReq(userInfo.role?.id)
      const userMenus = userMenusResult.data
      localCache.setItem('userMenus', userMenus)
      commit('changeUserMenus', userMenus)

      // 4.跳转到首页
      router.push({
        path: '/main'
      })
    },
    loadLoginAction({ commit }) {
      const token = localCache.getItem('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getItem('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getItem('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginMoudle
