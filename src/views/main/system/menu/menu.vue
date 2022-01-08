<template>
  <div class="menu">
    <page-list :listConfig="listConfig" pageName="menu" ref="pageListRef">
    </page-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageList from '@/components/page-list'

import listConfig from './config/list.config'

export default defineComponent({
  name: 'jfw-menu',
  components: {
    PageList
  },
  setup() {
    return {
      listConfig
    }
  }
})
</script>

<style scoped lang="less">
.user {
  padding-top: 10px;
}
</style>
