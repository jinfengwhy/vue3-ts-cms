import { ref } from 'vue'

import PageModal from '@/components/page-modal'

type cbFn = (item?: any) => void

export function usePageModal(newCbFn?: cbFn, editCbFn?: cbFn) {
  const dialogForm = ref({})
  const pageModalRef = ref<InstanceType<typeof PageModal>>()

  const handleNewBtnClick = () => {
    pageModalRef.value?.showDialog()
    dialogForm.value = {}
    newCbFn && newCbFn()
  }
  const handleEditBtnClick = (item: any) => {
    pageModalRef.value?.showDialog()
    dialogForm.value = { ...item }
    editCbFn && editCbFn(item)
  }

  return [dialogForm, pageModalRef, handleNewBtnClick, handleEditBtnClick]
}
