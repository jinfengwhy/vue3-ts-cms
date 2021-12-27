class LocalCache {
  private storage: Storage

  constructor(isLocalStorage = true) {
    this.storage = isLocalStorage ? localStorage : sessionStorage
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value))
  }

  getItem(key: string): any {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  deleteItem(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

export default new LocalCache()
