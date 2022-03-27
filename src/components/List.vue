<template>
  <ul class="product-table rounded-t-2xl bg-white">
    <li class="product-row !py-4 shadow text-gray-800 sticky top-0 bg-white">
      <div>
        <span v-for="field in fields" :key="field">{{ field }}</span>
      </div>
    </li>
    <slot />
  </ul>
</template>

<script lang="ts" setup>
  defineProps<{
    fields: string[]
  }>()
</script>
