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
        minlength="4"
      />
    </div>
    <button
      :disabled="code.length < 4"
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
  import apolloClient from '@/plugins/apolloClient'
  import gql from 'graphql-tag'
  import { useAuthStore } from '@/stores/auth'

  const props = defineProps<{ number: number }>()
  const emits = defineEmits(['close', 'submit'])

  const authStore = useAuthStore()

  const code = ref('')

  const title = computed(() => {
    return `新增 ${props.number} 點`
  })

  const submit = async () => {
    // TODO: fix security code
    try {
      await apolloClient.mutate({
        mutation: gql`
          mutation updatePoint($input: UpdatePointInput!) {
            updatePoint(input: $input)
          }
        `,
        variables: {
          input: {
            point: Number(props.number),
            SecurityCode: code.value,
          },
        },
      })

      await authStore.fetchMe()

      emits('submit')
      emits('close')
    } catch (e) {
      console.log(e)
    }
  }
</script>
