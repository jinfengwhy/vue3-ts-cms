<template>
  <div class="flexible-table">
    <div class="header">
      <slot name="header">
        <slot name="header-title"></slot>
        <div class="btns">
          <slot name="header-btns"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-bind="childrenProps"
    >
      <!-- 多选列 -->
      <template v-if="isShowSelectionColumn">
        <el-table-column type="selection" align="center"></el-table-column>
      </template>
      <!-- 序号列 -->
      <template v-if="isShowIndexColumn">
        <el-table-column type="index" label="序号" align="center" width="80" />
      </template>
      <!-- 自定义列 -->
      <template v-for="column in propList" :key="column.prop">
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :min-width="column.minWidth"
          show-overflow-tooltip
          align="center"
        >
          <template #default="slotProps">
            <slot
              :name="column.slotName ?? 'default'"
              :row="slotProps.row"
              :prop="column.prop"
            >
              {{ slotProps.row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="isShowFooter" class="footer">
      <slot name="footer">
        <el-pagination
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tableData: {
      type: Object,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    isShowIndexColumn: {
      type: Boolean,
      default: false
    },
    isShowSelectionColumn: {
      type: Boolean,
      default: false
    },
    isShowFooter: {
      type: Boolean,
      default: true
    },
    totalCount: {
      type: Number,
      default: 100
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 0 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', {
        ...props.page,
        pageSize
      })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', {
        ...props.page,
        currentPage
      })
    }

    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.flexible-table {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
  }
  .footer {
    display: flex;
    padding-top: 20px;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
