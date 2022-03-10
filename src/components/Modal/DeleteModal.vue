<template>
  <Modal title="確認刪除?" @close="emits('close')">
    <div class="flex items-center space-x-4">
      <button class="btn btn-outline-primary btn-block" @click="emits('close')">
        取消
      </button>
      <button
        class="btn btn-primary btn-block"
        @click="emits('submit', props.deletedId)"
      >
        確認
      </button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
  import Modal from '@/components/Modal.vue'

  const emits = defineEmits(['close', 'submit'])
  const props = defineProps<{ deletedId: number | null }>()
</script>
