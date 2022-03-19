import useFetchMe from '@/compositions/useFetchMe'
import useLogin, { LoginInput } from '@/compositions/useLogin'
import useRegister from '@/compositions/useRegister'
import { acceptHMRUpdate, defineStore } from 'pinia'

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
    async authLogin({ phone, password }: LoginInput): Promise<void> {
      const { login } = useLogin({ phone, password })

      try {
        const token = await login()

        this.setToken(token)
      } catch (e) {
        throw e
      }
    },
    async authRegister({ phone }: { phone: string }): Promise<void> {
      const { register } = useRegister(phone)

      await register()
      await this.authLogin({ phone, password: phone })
    },
    async adminLogin({ phone, password }: LoginInput): Promise<void> {
      const { adminLogin } = useLogin({ phone, password })
      try {
        const token = await adminLogin()

        this.setToken(token)
      } catch (error) {
        throw error
      }
    },
    authLogout(): void {
      this.removeToken()
      this.setUser(defaultUserInfo)
    },
    setToken(token?: string): void {
      if (!token) {
        return
      }

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
