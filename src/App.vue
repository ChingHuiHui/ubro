<template>
  <div class="h-screen flex">
    <DefaultSideBar />
    <div class="bg-gray-300 flex-1 pt-10 px-10 overflow-x-hidden">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import DefaultSideBar from './components/Layout/DefaultSideBar.vue'
</script>
