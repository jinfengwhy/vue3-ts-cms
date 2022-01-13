const listConfig = {
  title: '角色列表',
  newBtnTitle: '新建角色',
  isShowIndexColumn: true,
  isShowSelectionColumn: true,
  isShowFooter: false,
  propList: [
    { prop: 'name', label: '角色名称', minWidth: '120' },
    { prop: 'intro', label: '权限介绍', minWidth: '120' },
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
