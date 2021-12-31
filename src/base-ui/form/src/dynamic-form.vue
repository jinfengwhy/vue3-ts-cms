<template>
  <div class="dynamic-form">
    <el-form ref="form" :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" class="el-form-item-custom">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
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
          </el-col>
        </template>
      </el-row>
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
    },
    colLayout: {
      type: Object,
      default: () => ({
        // 弹性布局
        xl: 6, // >=1920px 4个
        lg: 8, // >=1200px 3个
        md: 12, // >=992px 2个
        sm: 24, // >=768px 1个
        xs: 24 // <768px 3个
      })
    },
    labelWidth: {
      type: String,
      default: '80px'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.el-form-item-custom {
  padding: 10px 20px;
}
</style>
