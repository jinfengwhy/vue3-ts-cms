<template>
  <div class="goods">
    <page-list :listConfig="listConfig" pageName="goods" ref="pageListRef">
      <template #newPrice="{ row, prop }">
        {{ '￥' + row[prop] }}
      </template>
      <template #imgUrl="{ row, prop }">
        <el-image
          style="width: 60px; height: 60px"
          :src="row[prop]"
          :preview-src-list="[row[prop]]"
        />
      </template>
    </page-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageList from '@/components/page-list'

import listConfig from './config/list.config'

import { usePageSearch } from '@/hooks/use-page-search'

export default defineComponent({
  name: 'goods',
  components: {
    PageList
  },
  setup() {
    const [pageListRef, handleSearchBtnClick, handleResetBtnClick] =
      usePageSearch()

    return {
      listConfig,
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
