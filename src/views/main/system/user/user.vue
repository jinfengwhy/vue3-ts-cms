<template>
  <div class="user">
    <page-search
      :formConfig="formConfig"
      @resetBtnClick="handleResetBtnClick"
      @searchBtnClick="handleSearchBtnClick"
    ></page-search>
    <page-list :listConfig="listConfig" pageName="users" ref="pageListRef">
      <template #status="{ row, prop }">
        <el-button size="mini" :type="row[prop] == 1 ? 'success' : 'danger'">
          {{ row[prop] == 1 ? '可用' : '禁用' }}
        </el-button>
      </template>
    </page-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageList from '@/components/page-list'

import formConfig from './config/search.config'
import listConfig from './config/list.config'

import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageList
  },
  setup() {
    const [pageListRef, handleSearchBtnClick, handleResetBtnClick] =
      usePageSearch()

    return {
      listConfig,
      formConfig,
      pageListRef,
      handleResetBtnClick,
      handleSearchBtnClick
    }
  }
})
</script>

<style scoped lang="less">
.user {
  padding-top: 10px;
}
</style>
