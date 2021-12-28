import { ILoginState } from './login/type'

export interface IRootState {
  counter: number
}

export interface IRootWithModule {
  login: ILoginState
}

// 这里是联合类型，也可通过继承实现，不过前者从业务角度更易理解
export type IStateType = IRootState & IRootWithModule
