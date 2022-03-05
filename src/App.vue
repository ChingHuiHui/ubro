<template>
  <div class="h-screen flex">
    <DefaultSideBar />
    <main class="flex-1 pt-16 px-10 overflow-x-hidden relative">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
  import DefaultSideBar from './components/Layout/DefaultSideBar.vue'
</script>
