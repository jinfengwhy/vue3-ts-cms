import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('views/login/login.vue')
  },
  {
    name: 'main',
    path: '/main',
    component: () => import('views/main/main.vue'),
    children: [
      {
        path: 'system/user',
        component: () => import('views/main/system/user/user.vue')
      },
      {
        path: 'system/role',
        component: () => import('views/main/system/role/role.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('views/not-found/not-found.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
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
})

export default router
