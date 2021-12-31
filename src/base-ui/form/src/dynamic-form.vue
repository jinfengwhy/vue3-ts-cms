<template>
  <div class="dynamic-form">
    我是dynamic form
    <el-form ref="form" label-width="80px">
      <template v-for="item in formItems" :key="item.label">
        <el-form-item :label="item.label">
          <template v-if="item.type === 'input' || item.type === 'password'">
            <el-input
              :placeholder="item.placeholder"
              v-bind="item.otherOptions"
            ></el-input>
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select v-bind="item.otherOptions">
              <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </el-select>
          </template>
          <template v-else-if="item.type === 'datepicker'">
            <el-date-picker v-bind="item.otherOptions" />
          </template>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IFormItem } from '../types'

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default() {
        return []
      }
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
