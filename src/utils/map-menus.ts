import { RouteRecordRaw } from 'vue-router'

import { IBreadcrumbItem } from '@/base-ui/breadcrumb/types/index'

let firstMenu: any = null

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
        // 用firstMenu记录第一个二级菜单
        !firstMenu && (firstMenu = menu)
      } else if (menu.type === 1) {
        // 说明是一级菜单
        _recursiveGetRoutes(menu.children)
      }
    })
  }
  _recursiveGetRoutes(userMenus)

  return routes
}

export function mapMenusToPermissions(userMenus: any[]) {
  const btnPermissions: any[] = []

  const _recurseGetPermissions = function (userMenus: any[]) {
    for (const menu of userMenus) {
      if (menu.type === 3) {
        btnPermissions.push(menu.permission)
      } else {
        _recurseGetPermissions(menu.children ?? [])
      }
    }
  }
  _recurseGetPermissions(userMenus)

  return btnPermissions
}

export function pathMapBreadcrumb(userMenus: any[], routePath: string): any {
  const breadcrumbs: IBreadcrumbItem[] = []
  pathMapMenu(userMenus, routePath, breadcrumbs)
  return breadcrumbs
}

export function pathMapMenu(
  userMenus: any[],
  routePath: string,
  breadcrumbs?: IBreadcrumbItem[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapMenu(menu.children, routePath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2) {
      if (menu.url === routePath) {
        return menu
      }
    }
  }
}

export function mapMenusToLeafKeys(userMenus: any[]) {
  const leafKeys: number[] = []

  const _recurseGetLeafKeys = (userMenus: any[]) => {
    for (const menu of userMenus) {
      if (menu.children) {
        _recurseGetLeafKeys(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeafKeys(userMenus)

  return leafKeys
}

export { firstMenu }
