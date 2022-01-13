const listConfig = {
  title: '菜单列表',
  newBtnTitle: '新建菜单',
  isShowIndexColumn: true,
  isShowSelectionColumn: true,
  isShowFooter: false,
  childrenProps: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  },
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '120' },
    { prop: 'type', label: '类型', minWidth: '80' },
    { prop: 'url', label: '菜单url', minWidth: '140' },
    { prop: 'icon', label: '菜单icon', minWidth: '140' },
    { prop: 'permission', label: '按钮权限', minWidth: '140' },
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
