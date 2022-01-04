import type { IForm } from '@/base-ui/form'

const formConfig: IForm = {
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称',
      field: 'name'
    },
    {
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
      field: 'intro'
    },
    {
      type: 'datepicker',
      label: '创建时间',
      field: 'createdAt',
      otherOptions: {
        type: 'daterange',
        'range-separator': '至',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
        style: 'width: 100%'
      }
    }
  ],
  labelWidth: '100px'
}

export default formConfig
