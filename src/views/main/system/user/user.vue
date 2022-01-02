<template>
  <div class="user">
    <page-search :formConfig="formConfig"></page-search>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'

import formConfig from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch
  },
  setup() {
    return {
      formConfig
    }
  }
})
</script>

<style scoped lang="less">
.user {
  padding: 10px 0;
  .content {
    padding: 20px;
    border-top: 20px solid #f5f5f5;
  }
}
</style>
