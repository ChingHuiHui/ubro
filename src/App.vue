<template>
  <div class="h-screen flex">
    <DefaultSideBar v-if="!isAdminLoginPage" />
    <main
      class="flex-1 pt-16 px-10 overflow-x-hidden relative"
      :class="{ 'bg-white': isAdminLoginPage }"
    >
      <router-view></router-view>
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

  router.beforeEach((to) => {
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

  router.beforeEach(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      return
    }

    authStore.setToken(token)
    authStore.fetchMe()
  })
</script>
