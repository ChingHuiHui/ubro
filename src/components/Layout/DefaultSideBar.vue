<template>
  <aside class="w-56 bg-primary-light">
    <nav class="h-full">
      <ul class="h-full p-10 flex flex-col items-center">
        <li class="mb-5 logo" />
        <li v-for="{ label, to } in links" :key="label">
          <router-link :to="to">{{ label }}</router-link>
        </li>
        <li v-if="!isLogin">
          <router-link to="/admin/login">
            <button class="btn btn-primary w-40">管理者</button>
          </router-link>
        </li>
        <li v-else>
          <button class="btn btn-primary w-40" @click="logout">
            {{ isAdminPage ? '登出' : '完成' }}
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'

  import { useAuthStore } from '@/stores/auth'
  import { useRouter, useRoute } from 'vue-router'

  const { isLogin } = storeToRefs(useAuthStore())
  const router = useRouter()
  const route = useRoute()

  const isAdminPage = computed(() => {
    const routeName = route.name

    if (!routeName) {
      return false
    }

    return (<string>routeName).includes('admin')
  })

  const links = computed(() => {
    if (!isLogin.value || route.name === 'home') {
      return []
    }

    if (isAdminPage.value) {
      return [
        { label: '商品', to: '/admin/products' },
        { label: '修改安全碼', to: '/admin/code' },
        { label: '紀錄', to: '/admin/records' },
      ]
    }

    return [
      { label: '集點卡', to: '/points' },
      { label: '兌換', to: '/exchange' },
      { label: '紀錄', to: '/records' },
    ]
  })

  const { authLogout } = useAuthStore()

  const logout = async () => {
    await authLogout()

    if (isAdminPage.value) {
      await router.push('/admin/login')
      return
    }

    await router.push('/')
  }
</script>

<style scoped>
  aside {
    nav ul {
      .logo {
        @apply w-32 h-32 bg-cover rounded-full;

        background-image: url('@/assets/images/logo.jpg');
      }

      li:not(.logo) {
        @apply py-2 text-lg lg:text-xl;
        @apply cursor-pointer transitable;

        &:hover,
        > a.router-link-exact-active {
          @apply text-gray-100;
        }

        &:last-child {
          @apply mt-auto;
        }
      }
    }
  }
</style>
