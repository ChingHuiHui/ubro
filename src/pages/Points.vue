<template>
  <div class="flex flex-col flex-center">
    <PointCards :points="points" />
  </div>
  <!-- TODO: for point -->
  <button class="stamp-button">
    <hui-icon icon="stamp" class="text-2xl" />
  </button>
</template>

<script setup lang="ts">
  import PointCards from '@/components/PointCards.vue'
  import HuiIcon from '@/components/HuiIcon.vue'

  // TODO: correct points from api
  const points = 22
</script>

<style scoped>
  .stamp-button {
    @apply z-20 w-20 h-20 rounded-full fixed bottom-4 right-4 bg-white shadow;
  }
</style>
