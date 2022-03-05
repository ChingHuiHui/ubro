<template>
  <div class="h-screen flex">
    <DefaultSideBar v-if="!isAdminLoginPage" />
    <main class="flex-1 pt-16 px-10 overflow-x-hidden relative">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  import DefaultSideBar from './components/Layout/DefaultSideBar.vue'

  const route = useRoute()

  const isAdminLoginPage = computed(() => route.name === 'admin-login')
</script>
