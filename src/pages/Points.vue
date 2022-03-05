<template>
  <div class="flex flex-col flex-center">
    <PointCards />
  </div>
  <!-- TODO: for point -->
  <button class="stamp-button">
    <hui-icon icon="stamp" class="text-2xl" />
  </button>
</template>

<script setup lang="ts">
  import PointCards from '@/components/PointCards.vue'
  import HuiIcon from '@/components/HuiIcon.vue'
</script>

<style scoped>
  .stamp-button {
    @apply w-20 h-20 rounded-full fixed bottom-4 right-4 bg-white;
  }
</style>
