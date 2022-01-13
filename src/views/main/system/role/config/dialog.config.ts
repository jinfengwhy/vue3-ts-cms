import { IForm } from '@/base-ui/form'

const dialogConfig: IForm = {
  title: '新建角色',
  colLayout: { span: 24 },
  itemStyle: {},
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称',
      field: 'name'
    },
    {
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍',
      field: 'intro'
    }
  ]
}

export default dialogConfig
