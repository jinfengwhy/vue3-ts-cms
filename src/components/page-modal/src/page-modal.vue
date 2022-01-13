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
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="hideDialog">取消</el-button>
          <el-button type="primary" @click="handleSureBtnClick">
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
import { useStore } from '@/store'

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
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
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
        for (const item of props.dialogConfig.formItems) {
          dialogItems.value[item.field] = newVal[item.field]
        }
      }
    )

    // 3.点击确定按钮的事件处理
    const store = useStore()
    const handleSureBtnClick = () => {
      // a:隐藏对话框
      hideDialog()
      // b:临时定义新增修改成功后触发页面刷新的函数
      const _getListAction = () => {
        store.dispatch('system/pageListAction', {
          pageName: props.pageName,
          queryInfo: {
            offset: 0,
            size: 10
          }
        })
      }
      // c:就确定按钮的click事件做处理
      if (Object.keys(props.dialogForm).length) {
        // 编辑
        store
          .dispatch('system/pageEditDataAction', {
            pageName: props.pageName,
            editData: { ...dialogItems.value, ...props.otherInfo },
            id: props.dialogForm.id
          })
          .then(() => {
            _getListAction()
          })
      } else {
        // 新增
        store
          .dispatch('system/pageAddDataAction', {
            pageName: props.pageName,
            newData: { ...dialogItems.value, ...props.otherInfo }
          })
          .then(() => {
            _getListAction()
          })
      }
    }

    return {
      dialogVisible,
      showDialog,
      hideDialog,
      dialogItems,
      handleSureBtnClick
    }
  }
})
</script>

<style scoped></style>
