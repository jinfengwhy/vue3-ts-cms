import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载所有的路由
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('@/router/main', true, /\.ts$/)
  routeFiles.keys().map((path) => {
    const route = require('../router/main' + path.split('.')[1])
    allRoutes.push(route.default)
  })

  // 2.通过userMenus去匹配需要添加的routes
  const _recursiveGetRoutes = function (userMenus: any[]) {
    userMenus.forEach((menu) => {
      if (menu.type === 2) {
        // 说明是二级菜单
        const route = allRoutes.find((route) => route.path === menu.url)
        route && routes.push(route)
      } else if (menu.type === 1) {
        // 说明是一级菜单
        _recursiveGetRoutes(menu.children)
      }
    })
  }
  _recursiveGetRoutes(userMenus)

  return routes
}
