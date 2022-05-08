<template>
  <div class="h-screen flex">
    <div
      v-if="loading"
      class="fixed z-50 inset-0 bg-black bg-opacity-60 flex-center text-white"
    >
      Loading ...
    </div>
    <DefaultSideBar v-if="!isAdminLoginPage && route.name !== 'verify'" />
    <main
      class="flex-1 pt-16 px-10 overflow-x-hidden relative"
      :class="{ 'bg-white': isAdminLoginPage }"
    >
      <div
        v-if="authStore.isLogin && !authStore.isAdmin"
        class="fixed top-4 right-0 px-2 pr-3 rounded-l-lg text-2xl bg-gray-500 text-white"
      >
        {{ phone }}
      </div>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import DefaultSideBar from '@/components/Layout/DefaultSideBar.vue'
  import { useAuthStore } from '@/stores/auth'
  import { useFetchStore } from '@/stores/fetchStatus'
  import useVerify from '@/compositions/useVerify'
  import { ROUTE_NAME } from '@/libs/enum'

  const { loading } = storeToRefs(useFetchStore())
  const { phone } = storeToRefs(useAuthStore())

  const route = useRoute()
  const router = useRouter()

  const authStore = useAuthStore()

  const isAdminLoginPage = computed(() => route.name === 'admin-login')

  const { isVerify, saveIntendedPage } = useVerify()

  router.beforeEach(async (to) => {
    const token = await localStorage.getItem('token')

    if (token) {
      await authStore.setToken(token)
      await authStore.fetchMe()
    }

    const exp = getExpireTime(token)

    if (exp && isExpired(exp)) {
      await authStore.removeToken()

      return {
        name: ROUTE_NAME.HOME,
      }
    }

    if (to.name === ROUTE_NAME.VERIFY) {
      return
    }

    if (!isVerify.value) {
      const intendedPage = to.name

      saveIntendedPage(intendedPage)

      return {
        name: ROUTE_NAME.VERIFY,
      }
    }

    if (to.meta.requiresAdmin && !authStore.isAdmin) {
      return {
        name: ROUTE_NAME.ADMIN_LOGIN,
      }
    }

    if (to.meta.requiresAuth && !authStore.isLogin) {
      return { name: ROUTE_NAME.HOME }
    }
  })

  const getExpireTime = (token: string | null): number | null => {
    try {
      if (!token) {
        return null
      }

      const { exp } = JSON.parse(atob(token.split('.')[1]))

      return exp
    } catch (e) {
      return null
    }
  }

  const isExpired = (exp: number): boolean => {
    return Date.now() > exp * 1000
  }
</script>
