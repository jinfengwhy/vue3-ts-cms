type IFormItemType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormItemType
  label: string
  placeholder?: string
  rules?: any[]
  options?: any[]
  otherOptions?: any
}
