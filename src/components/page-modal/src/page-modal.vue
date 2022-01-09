<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogConfig.title"
      width="30%"
      center
      destroy-on-close
    >
      <dynamic-form v-bind="dialogConfig" v-model="dialogItems"></dynamic-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="hideDialog">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

import DynamicForm from '@/base-ui/form'
import dialogConfig from '@/views/main/system/user/config/dialog.config'

export default defineComponent({
  components: {
    DynamicForm
  },
  props: {
    dialogConfig: {
      type: Object,
      required: true
    },
    dialogForm: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // 1.对话框的显示和隐藏
    const dialogVisible = ref(false)
    const showDialog = () => {
      dialogVisible.value = true
    }
    const hideDialog = () => {
      dialogVisible.value = false
    }

    // 2.对话框的值绑定
    const dialogItems = ref<any>({})
    watch(
      () => props.dialogForm,
      (newVal) => {
        for (const item of dialogConfig.formItems) {
          dialogItems.value[item.field] = newVal[item.field]
        }
      }
    )

    return {
      dialogVisible,
      showDialog,
      hideDialog,
      dialogItems
    }
  }
})
</script>

<style scoped></style>
