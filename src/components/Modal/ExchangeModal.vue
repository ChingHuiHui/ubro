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
  import apolloClient from '@/plugins/apolloClient'
  import gql from 'graphql-tag'

  import { useAuthStore } from '@/stores/auth'
  import Modal from '@/components/Modal.vue'
  import { useFetch } from '@/compositions/useFetch'

  const props = defineProps<{ productId: number | null }>()
  const emits = defineEmits(['close', 'submit'])

  const authStore = useAuthStore()

  const submit = async () => {
    const action = async () => {
      try {
        await apolloClient.mutate({
          mutation: gql`
            mutation exchange($productId: Int!) {
              exchange(productId: $productId)
            }
          `,
          variables: {
            productId: props.productId,
          },
        })

        await authStore.fetchMe()

        emits('submit')
        emits('close')
      } catch (e) {
        console.log(e)
      }
    }

    await useFetch(action)
  }
</script>
