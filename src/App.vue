<template>
  <div class="h-screen flex">
    <DefaultSideBar />
    <main class="flex-1 pt-20 px-10 overflow-x-hidden">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
  import DefaultSideBar from './components/Layout/DefaultSideBar.vue'
</script>
