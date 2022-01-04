<template>
  <div class="page-list">
    <flexible-table
      :tableData="tableData"
      :propList="listConfig"
      :isShowIndexColumn="false"
      :isShowSelectionColumn="false"
    >
      <template #header-title>
        <span class="title">用户列表</span>
      </template>
      <template #header-btns>
        <el-button size="medium" type="primary">新增用户</el-button>
      </template>
      <template #status="{ row, prop }">
        <el-button size="mini" :type="row[prop] == 1 ? 'success' : 'danger'">{{
          row[prop] == 1 ? '可用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="{ row, prop }">
        <span>{{ $filters.formatUtcTime(row[prop]) }}</span>
      </template>
      <template #updateAt="{ row, prop }">
        <span>{{ $filters.formatUtcTime(row[prop]) }}</span>
      </template>
      <template v-slot:operationColumn>
        <div class="handler-btns">
          <el-button icon="el-icon-edit" type="text">编辑</el-button>
          <el-button icon="el-icon-delete" type="text">删除</el-button>
        </div>
      </template>
    </flexible-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'
import { FlexibleTable } from '@/base-ui'

export default defineComponent({
  props: {
    listConfig: {
      type: Array,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    FlexibleTable
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/pageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    // 之所以放到计算属性中，是因为接口请求结果回来后，要触发数据的更新
    const tableData = computed(() =>
      store.getters[`system/tableList`](props.pageName)
    )

    return {
      tableData
    }
  }
})
</script>

<style scoped lang="less">
.page-list {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .handler-btns {
    display: flex;
    justify-content: center;
  }
}
</style>
