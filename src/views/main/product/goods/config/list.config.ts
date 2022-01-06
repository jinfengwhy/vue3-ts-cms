const listConfig = {
  title: '商品列表',
  isShowIndexColumn: false,
  isShowSelectionColumn: false,
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '80' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80' },
    { prop: 'newPrice', label: '新价格', minWidth: '80', slotName: 'newPrice' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'imgUrl' },
    { prop: 'status', label: '状态', minWidth: '80' },
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
