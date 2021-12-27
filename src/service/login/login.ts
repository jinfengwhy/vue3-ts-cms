import jfwRequest from '..'
import { IUserInfo, IUserResult, IDataType } from './type'

enum LoginAPI {
  USER_LOGIN = '/login',
  USER_INFO = '/users/', // 用法：/users/:userId
  USER_MENUS = '/role/' // 用法：/role/:roleId/menu
}

export function userLoginReq(
  userInfo: IUserInfo
): Promise<IDataType<IUserResult>> {
  return jfwRequest.post({
    url: LoginAPI.USER_LOGIN,
    data: userInfo,
    isShowLoading: true
  })
}

export function userInfoReq(userId: number): Promise<IDataType> {
  return jfwRequest.get({
    url: LoginAPI.USER_INFO + userId
  })
}

export function userMenusReq(roleId: number): Promise<IDataType> {
  return jfwRequest.get({
    url: LoginAPI.USER_MENUS + roleId + '/menu'
  })
}
