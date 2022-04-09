import { acceptHMRUpdate, defineStore } from 'pinia'

const labelDictionary: { [key: string]: string } = {
  SECURITY_CODE_IS_NOT_CORRECT: '安全碼錯誤',
  PASSWORD_ERROR: '密碼錯誤',
  PHONE_NOT_REGISTER: '此手機號碼未註冊',
}

export const useFetchStore = defineStore('error', {
  state: (): { loading: boolean; errorMessage: string } => {
    return {
      loading: false,
      errorMessage: '',
    }
  },
  actions: {
    setErrorMessage(message: string): void {
      const normalizedMessage = labelDictionary[message]

      this.errorMessage = normalizedMessage
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
