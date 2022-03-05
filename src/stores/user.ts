import { acceptHMRUpdate, defineStore } from 'pinia'

export type UserState = {
  name: string
  description: string
  github: string
  email: string
  position: string
  age: number
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      name: 'Ching Hui',
      description: "I'm a Uaena, also a frontend developer :)",
      github: 'https://github.com/ChingHuiHui',
      email: 'sunny70624@gmail.com',
      position: 'Frontend developer',
      age: 22,
    }
  },
})

// HMR (Hot Module Replacement)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
