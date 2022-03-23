<template>
  <div class="flex justify-center mt-20">
    <div class="bg-white p-6 rounded-xl wrapper">
      <HuiForm
        v-slot="{ invalid }"
        :rules="rules"
        :action="submit"
        class="space-y-6"
      >
        <HuiInput name="name" label="品項" />
        <HuiInput name="point" type="number" label="點數" />

        <button
          class="btn btn-primary btn-block"
          type="submit"
          :disabled="invalid"
        >
          新增
        </button>
      </HuiForm>
      <div v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import gql from 'graphql-tag'
  import apolloClient from '@/plugins/apolloClient'

  import * as yup from 'yup'
  import HuiForm from '@/components/Shared/HuiForm.vue'
  import HuiInput from '@/components/Shared/HuiInput.vue'
  import { ApolloError } from '@apollo/client/core'
  import { useFetch } from '@/compositions/useFetch'

  const error = ref('')

  const router = useRouter()

  const rules = yup.object({
    name: yup.string().required(),
    point: yup.number().required(),
  })

  const submit = async (values: { name: string; point: number }) => {
    const action = async () => {
      try {
        const { name, point } = values

        await apolloClient.mutate({
          mutation: gql`
            mutation createProduct($input: CreateProductInput!) {
              createProduct(input: $input) {
                id
              }
            }
          `,
          variables: {
            input: {
              name,
              point: Number(point),
            },
          },
        })

        await router.push('/admin/products')
      } catch (e) {
        error.value = (<ApolloError>e).message
      }
    }

    await useFetch(action)
  }
</script>

<style scoped>
  .logo {
    @apply w-56 h-56 bg-cover rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 opacity-50;
    @apply hidden lg:block;

    background-image: url('@/assets/images/logo.jpg');
  }
</style>
