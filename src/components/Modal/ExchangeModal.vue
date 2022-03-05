<template>
  <Modal title="確認兌換?" @close="emits('close')">
    <div class="flex items-center space-x-4">
      <button class="btn btn-outline-primary btn-block" @click="emits('close')">
        取消
      </button>
      <button class="btn btn-primary btn-block" @click="submit">確認</button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import Modal from '@/components/Modal.vue'

  const emits = defineEmits(['close'])

  const submit = () => {
    // TODO: sent api
  }
</script>
