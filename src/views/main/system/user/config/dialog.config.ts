import { IForm } from '@/base-ui/form'

const dialogConfig: IForm = {
  title: '新建用户',
  colLayout: { span: 24 },
  itemStyle: {},
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
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      field: 'password',
      isHidden: false
    },
    {
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码',
      field: 'cellphone'
    },
    {
      type: 'select',
      label: '选择部门',
      field: 'departmentId',
      options: [],
      otherOptions: {
        style: 'width: 100%'
      }
    },
    {
      type: 'select',
      label: '选择角色',
      field: 'roleId',
      options: [],
      otherOptions: {
        style: 'width: 100%'
      }
    }
  ]
}

export default dialogConfig
