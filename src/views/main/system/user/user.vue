<template>
  <div class="user">
    <page-search :formConfig="formConfig"></page-search>
    <page-list :listConfig="listConfig" pageName="users"></page-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageList from '@/components/page-list'

import formConfig from './config/search.config'
import listConfig from './config/list.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageList
  },
  setup() {
    return {
      listConfig,
      formConfig
    }
  }
})
</script>

<style scoped lang="less">
.user {
  padding-top: 10px;
}
</style>
