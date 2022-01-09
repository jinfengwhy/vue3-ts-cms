<template>
  <div class="user">
    <page-search
      :formConfig="formConfig"
      @resetBtnClick="handleResetBtnClick"
      @searchBtnClick="handleSearchBtnClick"
    ></page-search>
    <page-list
      :listConfig="listConfig"
      pageName="users"
      ref="pageListRef"
      @newBtnClick="handleNewBtnClick"
      @editBtnClick="handleEditBtnClick"
    >
      <template #status="{ row, prop }">
        <el-button size="mini" :type="row[prop] == 1 ? 'success' : 'danger'">
          {{ row[prop] == 1 ? '可用' : '禁用' }}
        </el-button>
      </template>
    </page-list>
    <page-modal
      :dialogConfig="dialogConfigRef"
      :dialogForm="dialogForm"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageList from '@/components/page-list'
import PageModal from '@/components/page-modal'

import formConfig from './config/search.config'
import listConfig from './config/list.config'
import dialogConfig from './config/dialog.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageList,
    PageModal
  },
  setup() {
    // 1.表单查询的hook
    const [pageListRef, handleSearchBtnClick, handleResetBtnClick] =
      usePageSearch()

    // 2.密码和title在显/隐时的特殊处理
    const passwordItem = dialogConfig.formItems.find(
      (item: any) => item.type === 'password'
    )
    const newCallbackFn = () => {
      dialogConfig.title = '新建用户'
      passwordItem!.isHidden = false
    }
    const editCallbackFn = () => {
      dialogConfig.title = '编辑用户'
      passwordItem!.isHidden = true
    }

    // 3.对话框显示/隐藏的hook
    const [dialogForm, pageModalRef, handleNewBtnClick, handleEditBtnClick] =
      usePageModal(newCallbackFn, editCallbackFn)

    // 4.动态添加部门和角色下拉值域
    const store = useStore()
    const dialogConfigRef = computed(() => {
      const depItem = dialogConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      depItem!.options = store.state.depList.map((item) => ({
        label: item.name,
        value: item.id
      }))
      const roleItem = dialogConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.roleList.map((item) => ({
        label: item.name,
        value: item.id
      }))
      return dialogConfig
    })

    return {
      listConfig,
      formConfig,
      dialogConfigRef,
      pageListRef,
      handleResetBtnClick,
      handleSearchBtnClick,
      dialogForm,
      pageModalRef,
      handleNewBtnClick,
      handleEditBtnClick
    }
  }
})
</script>

<style scoped lang="less">
.user {
  padding-top: 10px;
}
</style>
