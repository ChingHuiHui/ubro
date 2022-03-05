import { App } from 'vue'
import LocalStorage from '@/libs/LocalStorage'

const StoragePlugin = {
  install: (app: App) => {
    const storage = new LocalStorage()

    app.provide('storage', storage)
  },
}

export default StoragePlugin
