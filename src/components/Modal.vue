<template>
  <div
    class="fixed inset-0 z-40 bg-black bg-opacity-60 flex-center"
    @click.self="close"
  >
    <div class="modal min-w-[300px] bg-white p-6 rounded-lg relative">
      <HuiIcon
        icon="plus"
        class="rotate-45 absolute right-6 top-6 cursor-pointer"
        @click="close"
      />
      <slot name="title">
        <div class="h1 text-center mb-4" v-if="title">{{ title }}</div>
      </slot>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import HuiIcon from '@/components/HuiIcon.vue'
  import { ref } from 'vue'

  withDefaults(defineProps<{ title?: string }>(), {
    title: '',
  })

  const emit = defineEmits(['close'])

  const close = () => {
    emit('close')
  }
</script>
