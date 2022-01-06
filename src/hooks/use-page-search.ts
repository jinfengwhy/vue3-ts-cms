import { ref } from 'vue'

import PageList from '@/components/page-list'

export function usePageSearch() {
  const pageListRef = ref<InstanceType<typeof PageList>>()

  const handleSearchBtnClick = (queryInfo: any) => {
    pageListRef.value?.getListAction(queryInfo)
  }

  const handleResetBtnClick = () => {
    pageListRef.value?.getListAction()
  }

  return [pageListRef, handleSearchBtnClick, handleResetBtnClick]
}
