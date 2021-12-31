<template>
  <div class="user">
    <dynamic-form v-bind="formConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DynamicForm from '@/base-ui/form'

import formConfig from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    DynamicForm
  },
  setup() {
    return {
      formConfig
    }
  }
})
</script>

<style scoped></style>
