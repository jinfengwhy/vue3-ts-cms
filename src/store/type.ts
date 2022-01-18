import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'
import { IAnalysisState } from './main/analysis/type'

export interface IRootState {
  counter: number
  depList: any[]
  roleList: any[]
  menuList: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  analysis: IAnalysisState
}

// 这里是联合类型，也可通过继承实现，不过前者从业务角度更易理解
export type IStateType = IRootState & IRootWithModule
