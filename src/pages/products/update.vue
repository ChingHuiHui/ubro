<template>
  <div class="flex justify-center mt-20">
    <div class="bg-white p-6 rounded-xl wrapper">
      <HuiForm
        v-if="!loading"
        v-slot="{ invalid }"
        :rules="rules"
        :action="submit"
        :initial-values="initialValues"
        class="space-y-6"
      >
        <HuiInput name="name" label="品項" />
        <HuiInput name="point" type="number" label="點數" />

        <button
          class="btn btn-primary btn-block"
          type="submit"
          :disabled="invalid"
        >
          更新
        </button>
      </HuiForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as yup from 'yup'
  import { useRoute, useRouter } from 'vue-router'

  import HuiForm from '@/components/Shared/HuiForm.vue'
  import HuiInput from '@/components/Shared/HuiInput.vue'
  import gql from 'graphql-tag'

  import { reactive, ref, watchEffect, watchPostEffect } from 'vue'
  import apolloClient from '@/plugins/apolloClient'

  const router = useRouter()
  const route = useRoute()

  const rules = yup.object({
    name: yup.string().required(),
    point: yup.number().required(),
  })

  const initialValues = reactive({
    name: '',
    point: 0,
  })

  const loading = ref(true)

  const fetchProduct = async () => {
    loading.value = true
    const {
      data: { product },
    } = await apolloClient.query({
      query: gql`
        query product($id: Int!) {
          product(id: $id) {
            id
            name
            point
          }
        }
      `,
      variables: {
        id: +route.params.id,
      },
    })

    initialValues.name = product.name
    initialValues.point = product.point

    loading.value = false
  }

  watchPostEffect(() => {
    fetchProduct()
  })

  // TODO: optimize the Hui-Form
  const submit = async (values: { name: string; point: number }) => {
    const updateProduct = async (name: string, point: number) => {
      await apolloClient.mutate({
        mutation: gql`
          mutation updateProduct($input: UpdateProductInput!) {
            updateProduct(input: $input) {
              id
              name
              point
            }
          }
        `,
        variables: {
          input: {
            id: Number(route.params.id),
            name,
            point: Number(point),
          },
        },
      })
    }

    await updateProduct(values.name, values.point)
    await router.push('/admin/products')
  }
</script>

<style scoped>
  .logo {
    @apply w-56 h-56 bg-cover rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 opacity-50;
    @apply hidden lg:block;

    background-image: url('@/assets/images/logo.jpg');
  }
</style>
