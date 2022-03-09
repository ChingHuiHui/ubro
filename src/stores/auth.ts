import useFetchMe from '@/compositions/useFetchMe'
import useLogin from '@/compositions/useLogin'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { Ref } from 'vue'

type User = {
  phone: string
  point: number
  isAdmin: boolean
}

const defaultUserInfo = {
  phone: '',
  point: 0,
  isAdmin: false,
}

export const useAuthStore = defineStore('auth', {
  state: (): { accessToken: string | null; user: User } => ({
    accessToken: null,
    user: defaultUserInfo,
  }),
  getters: {
    isLogin(): boolean {
      return !!this.accessToken
    },
    isAdmin(): boolean {
      return this.user.isAdmin
    },
    point(): number {
      return this.user.point
    },
  },
  actions: {
    async authLogin(phone: Ref<string>): Promise<void> {
      const { login } = useLogin(phone)

      const token = await login()

      this.setToken(token)
    },
    authLogout(): void {
      this.removeToken()
      this.setUser(defaultUserInfo)
    },
    setToken(token: string): void {
      this.accessToken = token

      localStorage.setItem('token', token)
    },
    removeToken(): void {
      this.accessToken = null
      localStorage.removeItem('token')
    },
    setUser(user: User): void {
      this.user = user
    },
    async fetchMe(): Promise<void> {
      const user = await useFetchMe()

      if (!user) {
        return
      }

      this.setUser(user)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
