<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <nav-breadcrumber :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useStore } from '@/store'
import { IS_MENU_FOLD_DEFAULT } from '@/constants'
import { pathMapBreadcrumb } from '@/utils/map-menus'
import NavBreadcrumber from '@/base-ui/breadcrumb'

import UserInfo from './user-info.vue'

export default defineComponent({
  emits: ['foldChange'],
  components: {
    UserInfo,
    NavBreadcrumber
  },
  setup(_props, { emit }) {
    const isFold = ref(IS_MENU_FOLD_DEFAULT)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 为了让面包屑在路由发生变化时也随之响应，因此放到计算属性中
    const store = useStore()
    const route = useRoute()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      return pathMapBreadcrumb(userMenus, route.path)
    })

    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
