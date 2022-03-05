<template>
  <div
    class="fixed inset-0 z-50 bg-black bg-opacity-60 flex-center"
    @click.self="close"
  >
    <div class="modal min-w-[300px] bg-white p-6 rounded-lg relative">
      <HuiIcon
        icon="plus"
        class="rotate-45 absolute right-6 top-6 cursor-pointer"
        @click="close"
      />
      <div class="h1 text-center mb-4">新增{{ number }}點</div>
      <div class="flex items-center space-x-4 mb-4">
        <label for="code">安全碼</label>
        <input
          v-model="code"
          placeholder="請輸入安全碼"
          name="code"
          type="text"
          class="border px-2"
        />
      </div>
      <button
        :disabled="code === ''"
        class="btn btn-primary btn-block"
        :class="{ 'bg-gray-300 pointer-events-none': code === '' }"
        @click="submit"
      >
        確認新增
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import HuiIcon from '@/components/HuiIcon.vue'
  import { ref } from 'vue'

  defineProps<{ number: number }>()
  const emit = defineEmits(['close'])

  const code = ref('')

  const close = () => {
    emit('close')
  }

  const submit = () => {
    // TODO: sent api
  }
</script>
