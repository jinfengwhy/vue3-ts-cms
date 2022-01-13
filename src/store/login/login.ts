import { Module } from 'vuex'

import { userLoginReq, userInfoReq, userMenusReq } from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import router from '@/router'
import { IUserInfo } from '@/service/login/type'
import { ILoginState } from './type'
import { IRootState } from '../type'

const loginMoudle: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, payload: string) {
      state.token = payload
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload
    },
    changeUserMenus(state, userMenus: Array<any>) {
      state.userMenus = userMenus

      // 1.通过userMenus去生成routes
      const routes = mapMenusToRoutes(userMenus)

      // 2.将routes遍历添加到router（注意：main为/main这条顶层路由的name属性）
      routes.forEach((route) => router.addRoute('main', route))

      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async userLoginAction({ commit, dispatch }, payload: IUserInfo) {
      // 1.验证用户名和密码
      const loginResult = await userLoginReq(payload)
      const { id, token } = loginResult.data
      localCache.setItem('token', token)
      commit('changeToken', token)
      dispatch('getInitialDataAction', null, { root: true })

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
    loadLoginAction({ commit, dispatch }) {
      const token = localCache.getItem('token')
      if (token) {
        commit('changeToken', token)
        // 确保拿到token之后，我们再去请求权限相关的信息（否则可能请求时token还没获取）
        dispatch('getInitialDataAction', null, { root: true })
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
