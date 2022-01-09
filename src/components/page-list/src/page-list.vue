<template>
  <div class="page-list">
    <flexible-table
      :tableData="tableData"
      v-bind="listConfig"
      :totalCount="totalCount"
      v-model:page="pageInfo"
    >
      <template #header-title>
        <span class="title">{{ listConfig.title }}</span>
      </template>
      <template #header-btns>
        <el-button
          v-if="isCreate"
          size="medium"
          type="primary"
          @click="handleNewClick"
        >
          新增用户
        </el-button>
      </template>
      <template #createAt="{ row, prop }">
        <span>{{ $filters.formatUtcTime(row[prop]) }}</span>
      </template>
      <template #updateAt="{ row, prop }">
        <span>{{ $filters.formatUtcTime(row[prop]) }}</span>
      </template>
      <template #operationColumn="{ row }">
        <div class="handler-btns">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            type="text"
            @click="handleEditClick(row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            type="text"
            @click="handleDeleteClick(row)"
          >
            删除
          </el-button>
        </div>
      </template>
      <template v-for="name in otherSlots" :key="name" #[name]="{ row, prop }">
        <slot :name="name" :row="row" :prop="prop"></slot>
      </template>
    </flexible-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

import { useStore } from '@/store'
import { FlexibleTable } from '@/base-ui'
import { usePermissions } from '@/hooks/use-permissions'

export default defineComponent({
  props: {
    listConfig: {
      type: Object,
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
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 1.获取用户权限
    const isCreate = usePermissions(props.pageName, 'create')
    const isDelete = usePermissions(props.pageName, 'delete')
    const isUpdate = usePermissions(props.pageName, 'update')
    const isQuery = usePermissions(props.pageName, 'query')

    // 2.界面插槽的获取（插槽的跨组件传递）
    const commonSlots = [
      'header-title',
      'header-btns',
      'createAt',
      'updateAt',
      'operationColumn'
    ]
    const otherSlots = props.listConfig.propList
      .filter(
        (item: any) => item.slotName && !commonSlots.includes(item.slotName)
      )
      .map((item: any) => item.slotName)

    // 3.双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => {
      getListAction()
    })

    // 4.抽取一个请求页面数据的方法
    const getListAction = (queryParams = {}) => {
      if (!isQuery) return
      store.dispatch('system/pageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryParams
        }
      })
    }
    getListAction()

    // 5.从vuex中获取数据
    const tableData = computed(() =>
      store.getters[`system/tableList`](props.pageName)
    )
    const totalCount = computed(() =>
      store.getters[`system/totalCount`](props.pageName)
    )

    // 6.删除/新增/编辑的逻辑
    const handleDeleteClick = (row: any) => {
      store
        .dispatch('system/pageDelDataAction', {
          pageName: props.pageName,
          id: row.id
        })
        .then(() => {
          getListAction()
        })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      isCreate,
      isDelete,
      isUpdate,
      getListAction,
      tableData,
      totalCount,
      pageInfo,
      otherSlots,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
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
