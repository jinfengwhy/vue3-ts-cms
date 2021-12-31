import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('views/login/login.vue')
  },
  {
    name: 'main',
    path: '/main',
    component: () => import('views/main/main.vue')
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: () => import('views/not-found/not-found.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to) => {
  if (to.path != '/login') {
    const token = localCache.getItem('token')
    if (!token) {
      return {
        path: '/login'
      }
    }
  }

  // 如果匹配到/main，则默认跳转到第一个菜单
  if (to.path == '/main') {
    return {
      path: firstMenu.url
    }
  }
})

export default router
