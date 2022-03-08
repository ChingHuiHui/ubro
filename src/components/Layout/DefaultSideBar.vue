<template>
  <aside class="w-56 bg-primary-light">
    <nav class="h-full">
      <ul class="h-full p-10 flex flex-col items-center">
        <li class="mb-5 logo">
          <router-link to="/" class="w-full h-full block" />
        </li>
        <li v-for="{ label, to } in links" :key="label">
          <router-link :to="to">{{ label }}</router-link>
        </li>
        <li class="mt-auto">
          <router-link to="/admin/login">
            <button class="btn btn-primary w-40">管理者</button>
          </router-link>
        </li>
        <li>
          <!-- TODO: for logout -->
          <button class="btn btn-primary w-40">完成</button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '@/stores/auth'
  import { computed } from 'vue'

  const authStore = useAuthStore()
  const links = computed(() => {
    if (authStore.isLogin) {
      return [
        { label: '集點卡', to: '/points' },
        { label: '兌換', to: '/exchange' },
      ]
    }

    return []
  })
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
      }
    }
  }
</style>
