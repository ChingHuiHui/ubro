<template>
  <div class="h-screen flex">
    <DefaultSideBar v-if="!isAdminLoginPage" />
    <main
      class="flex-1 pt-16 px-10 overflow-x-hidden relative"
      :class="{ 'bg-white': isAdminLoginPage }"
    >
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :key="$route.name" :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import DefaultSideBar from './components/Layout/DefaultSideBar.vue'
  import { useAuthStore } from './stores/auth'

  const route = useRoute()
  const router = useRouter()

  const authStore = useAuthStore()

  const isAdminLoginPage = computed(() => route.name === 'admin-login')

  router.beforeEach(async (to) => {
    const token = await localStorage.getItem('token')

    if (!token) {
      return
    }

    const exp = getExpireTime(token)

    if (exp && isExpired(exp)) {
      await authStore.removeToken()

      return {
        name: 'home',
      }
    }

    await authStore.setToken(token)
    await authStore.fetchMe()

    if (to.meta.requiresAuth && !authStore.isLogin) {
      return {
        name: 'home',
      }
    }

    if (to.meta.requiresAdmin && !authStore.isAdmin) {
      return {
        name: 'admin-login',
      }
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

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
