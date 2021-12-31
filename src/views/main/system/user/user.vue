<template>
  <div class="user">
    <dynamic-form :formItems="formItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DynamicForm from '@/base-ui/form'
import type { IFormItem } from '@/base-ui/form'

export default defineComponent({
  name: 'user',
  components: {
    DynamicForm
  },
  setup() {
    const formItems: IFormItem[] = [
      {
        type: 'input',
        label: '用户名',
        placeholder: '请输入用户名'
      },
      {
        type: 'password',
        label: '密码'
      },
      {
        type: 'select',
        label: '喜好',
        options: [
          { label: '篮球', value: 'basketball' },
          { label: '足球', value: 'football' }
        ],
        otherOptions: {
          style: 'width: 100%'
        }
      },
      {
        type: 'datepicker',
        label: '时间',
        otherOptions: {
          type: 'daterange',
          'range-separator': '至',
          'start-placeholder': '开始日期',
          'end-placeholder': '结束日期',
          style: 'width: 100%'
        }
      }
    ]

    return {
      formItems
    }
  }
})
</script>

<style scoped></style>
