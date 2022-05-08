<template>
  <Modal :title="title" @close="emits('close')">
    <p class="text-red-500 text-sm mb-1">{{ errorMessage }}</p>
    <button class="btn btn-primary btn-block" @click="submit">確認新增</button>
  </Modal>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Modal from '@/components/Modal.vue'
  import apolloClient from '@/plugins/apolloClient'
  import gql from 'graphql-tag'
  import { useAuthStore } from '@/stores/auth'
  import { useFetchStore } from '@/stores/fetchStatus'
  import { storeToRefs } from 'pinia'

  const props = defineProps<{ number: number }>()
  const emits = defineEmits(['close', 'submit'])

  const authStore = useAuthStore()

  const code = ref('')

  const title = computed(() => {
    return `新增 ${props.number} 點`
  })

  const { errorMessage } = storeToRefs(useFetchStore())

  const submit = async () => {
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
