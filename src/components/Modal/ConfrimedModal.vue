<template>
  <Modal :title="title" @close="emits('close')">
    <div class="flex items-center space-x-4 mb-4">
      <label for="code">安全碼</label>
      <input
        v-model="code"
        placeholder="請輸入安全碼"
        name="code"
        type="password"
        class="border px-2"
        maxlength="4"
      />
    </div>
    <button
      :disabled="code === ''"
      class="btn btn-primary btn-block"
      @click="submit"
    >
      確認新增
    </button>
  </Modal>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Modal from '@/components/Modal.vue'

  const props = defineProps<{ number: number }>()
  const emits = defineEmits(['close'])

  const code = ref('')

  const title = computed(() => {
    return `新增 ${props.number} 點`
  })

  const submit = () => {
    // TODO: sent api
  }
</script>
