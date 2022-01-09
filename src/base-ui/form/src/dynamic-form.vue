<template>
  <div class="dynamic-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form ref="form" :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formData[item.field]"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      // 这里写成非箭头函数的话，setup中获取props类型有问题
      default: () => []
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
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '20px 10px' })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 1.将modelValue映射为组件内部一个独立的对象
    const formData = ref({ ...props.modelValue })

    // 2.监听formData对象的变更，一旦发生变化，发出update:modelValue事件
    watch(
      formData,
      (newData) => {
        emit('update:modelValue', newData)
      },
      {
        deep: true
      }
    )

    return {
      formData
    }
  }
})
</script>

<style scoped lang="less"></style>
