export const rules = {
  name: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,8}/,
      message: '账号必须是6~8位的字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,}/,
      message: '密码必须是3位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}
