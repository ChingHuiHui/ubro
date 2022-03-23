<template>
  <div class="container flex-center mt-20">
    <div
      v-if="loading"
      class="fixed inset-0 bg-black bg-opacity-60 flex-center text-white"
    >
      Loading ...
    </div>
    <div class="bg-white p-10 rounded-2xl">
      <HuiForm
        v-slot="{ invalid }"
        :rules="rules"
        :action="submit"
        class="w-64 space-y-6"
      >
        <HuiInput name="code" label="安全碼" type="password" />
        <HuiInput
          name="codeConfirmation"
          label="請再輸入一次"
          type="password"
        />
        <button
          :disabled="invalid"
          class="btn btn-primary btn-block"
          type="submit"
        >
          變更
        </button>
        <div class="mt-1 text-sm text-red-500">{{ errorText }}</div>
        <div class="mt-1 text-sm text-blue-500">{{ successText }}</div>
      </HuiForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { ApolloError } from '@apollo/client/core'

  import apolloClient from '@/plugins/apolloClient'
  import gql from 'graphql-tag'
  import * as yup from 'yup'

  import HuiForm from '@/components/Shared/HuiForm.vue'
  import HuiInput from '@/components/Shared/HuiInput.vue'

  const rules = yup.object({
    code: yup.string().required().length(4),
    codeConfirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('code')], 'code do not match'),
  })

  let loading = ref(false)
  let errorText = ref('')
  let successText = ref('')

  const submit = async (values: { code: string }) => {
    try {
      loading.value = true
      const { code } = values

      await apolloClient.mutate({
        mutation: gql`
          mutation updateSecurityCode($code: String!) {
            updateSecurityCode(code: $code)
          }
        `,
        variables: {
          code,
        },
      })

      errorText.value = ''
      successText.value = '更新成功'

      loading.value = false
    } catch (error) {
      errorText.value = (<ApolloError>error).message
      successText.value = ''

      loading.value = false
    }
  }
</script>

<style scoped>
  .logo {
    @apply w-56 h-56 bg-cover rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 opacity-50;
    @apply hidden lg:block;

    background-image: url('@/assets/images/logo.jpg');
  }
</style>
