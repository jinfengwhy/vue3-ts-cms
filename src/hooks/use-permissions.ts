import { useStore } from '@/store'

export function usePermissions(pageName: string, operation: string): boolean {
  const store = useStore()

  const permissions = store.state.login.permissions
  return permissions.includes(`system:${pageName}:${operation}`)
}
