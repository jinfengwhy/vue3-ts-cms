const listConfig = {
  title: '用户列表',
  newBtnTitle: '新建用户',
  isShowIndexColumn: false,
  isShowSelectionColumn: false,
  propList: [
    { prop: 'name', label: '用户名', minWidth: '120' },
    { prop: 'realname', label: '真实姓名', minWidth: '120' },
    { prop: 'cellphone', label: '手机号', minWidth: '120' },
    { prop: 'enable', label: '状态', minWidth: '80', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '150', slotName: 'operationColumn' }
  ]
}

export default listConfig
