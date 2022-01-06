import type { IForm } from '@/base-ui/form'

const formConfig: IForm = {
  formItems: [
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      field: 'name'
    },
    {
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      field: 'realname'
    },
    {
      type: 'input',
      label: '手机号',
      placeholder: '请输入手机号',
      field: 'cellphone'
    },
    {
      type: 'select',
      label: '状态',
      field: 'enable',
      options: [
        { label: '可用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      otherOptions: {
        style: 'width: 100%'
      }
    },
    {
      type: 'datepicker',
      label: '创建时间',
      field: 'createAt',
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
