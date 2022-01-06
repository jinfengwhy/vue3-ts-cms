<template>
  <div class="page-search">
    <dynamic-form v-bind="formConfig" v-model="formData">
      <template #header>
        <h2 class="title">高级搜索</h2>
      </template>
      <template #footer>
        <div class="btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearchClick"
            >搜索</el-button
          >
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
  emits: ['resetBtnClick', 'searchBtnClick'],
  setup(props, { emit }) {
    // initialFormData的引用只在赋值时使用了一次
    const initialFormData: any = {}
    for (const item of props.formConfig.formItems) {
      initialFormData[item.field] = ''
    }
    const formData = ref(initialFormData)

    // 重置按钮点击事件
    const handleResetClick = () => {
      Object.keys(formData.value).forEach((key) => {
        formData.value[key] = initialFormData[key]
      })
      emit('resetBtnClick')
    }

    // 搜索按钮点击事件
    const handleSearchClick = () => {
      emit('searchBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleSearchClick
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
