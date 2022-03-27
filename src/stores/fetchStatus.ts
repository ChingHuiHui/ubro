import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFetchStore = defineStore('error', {
  state: (): { loading: boolean; errorMessage: string } => {
    return {
      loading: false,
      errorMessage: '',
    }
  },
  actions: {
    setErrorMessage(message: string): void {
      this.errorMessage = message
    },
    setLoading(loading: boolean): void {
      this.loading = loading
    },
  },
})

// HMR (Hot Module Replacement)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFetchStore, import.meta.hot))
}
