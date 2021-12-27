export interface IUserInfo {
  name: string
  password: number
}

export interface IUserResult {
  id: number
  name: string
  token: string
}

export interface IDataType<T = any> {
  code: number
  data: T
}
