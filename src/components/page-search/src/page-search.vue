<template>
  <div class="page-search">
    <dynamic-form v-bind="formConfig" v-model="formData">
      <template #header>
        <h1 class="title">高级搜索</h1>
      </template>
      <template #footer>
        <div class="btns">
          <el-button icon="el-icon-refresh">重置</el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </template>
    </dynamic-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import DynamicForm from '@/base-ui/form'

export default defineComponent({
  components: {
    DynamicForm
  },
  props: {
    formConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      hobbies: '',
      createdAt: ''
    })

    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  .title {
    color: red;
  }
  .btns {
    text-align: right;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
