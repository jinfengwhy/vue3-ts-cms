<template>
  <div class="role">
    <page-search
      :formConfig="formConfig"
      @resetBtnClick="handleResetBtnClick"
      @searchBtnClick="handleSearchBtnClick"
    ></page-search>
    <page-list
      :listConfig="listConfig"
      pageName="role"
      ref="pageListRef"
      @editBtnClick="handleEditBtnClick"
      @newBtnClick="handleNewBtnClick"
    ></page-list>
    <page-modal
      :dialogConfig="dialogConfig"
      :dialogForm="dialogForm"
      :otherInfo="otherInfo"
      pageName="role"
      ref="pageModalRef"
    >
      <el-tree
        :data="menuList"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        ref="elTreeRef"
        @check="handleTreeCheck"
      >
      </el-tree>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search'
import PageList from '@/components/page-list'
import PageModal from '@/components/page-modal'

import formConfig from './config/search.config'
import listConfig from './config/list.config'
import dialogConfig from './config/dialog.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStore } from '@/store'
import { mapMenusToLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageList,
    PageModal
  },
  setup() {
    // 1.表单查询的hook
    const [pageListRef, handleSearchBtnClick, handleResetBtnClick] =
      usePageSearch()

    // 2.新建角色时对菜单列表的获取及监听
    const store = useStore()
    const menuList = computed(() => store.state.menuList)
    const otherInfo = ref<any>({})
    const handleTreeCheck = (data1: any, data2: any) => {
      const { checkedKeys, halfCheckedKeys } = data2
      otherInfo.value = {
        menuList: [...checkedKeys, ...halfCheckedKeys]
      }
    }

    // 3.对话框显示/隐藏的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallbackFn = (item: any) => {
      const leafKeys = mapMenusToLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value!.setCheckedKeys(leafKeys, true)
      })
    }
    const [dialogForm, pageModalRef, handleNewBtnClick, handleEditBtnClick] =
      usePageModal(undefined, editCallbackFn)

    return {
      listConfig,
      formConfig,
      dialogConfig,
      pageListRef,
      handleSearchBtnClick,
      handleResetBtnClick,
      dialogForm,
      pageModalRef,
      handleNewBtnClick,
      handleEditBtnClick,
      elTreeRef,
      menuList,
      handleTreeCheck,
      otherInfo
    }
  }
})
</script>

<style scoped lang="less">
.role {
  padding-top: 10px;
}
</style>
