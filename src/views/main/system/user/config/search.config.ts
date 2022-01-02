import type { IForm } from '@/base-ui/form'

const formConfig: IForm = {
  formItems: [
    {
      type: 'input',
      label: 'id',
      placeholder: '请输入id',
      field: 'id'
    },
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      field: 'name'
    },
    {
      type: 'password',
      label: '密码',
      field: 'password'
    },
    {
      type: 'select',
      label: '喜好',
      field: 'hobbies',
      options: [
        { label: '篮球', value: 'basketball' },
        { label: '足球', value: 'football' }
      ],
      otherOptions: {
        style: 'width: 100%'
      }
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
