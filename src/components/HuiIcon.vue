<template>
  <font-awesome-icon :icon="[pack, icon]" />
</template>

<script setup lang="ts">
  withDefaults(defineProps<{ pack?: string; icon?: string }>(), {
    pack: 'fas',
    icon: '',
  })
</script>
