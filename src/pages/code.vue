<template>
  <div class="container flex-center mt-20">
    <div class="bg-white p-10 rounded-2xl">
      <HuiForm
        v-slot="{ invalid }"
        :rules="rules"
        :action="submit"
        class="w-64 space-y-6"
      >
        <HuiInput
          minlength="4"
          maxlength="4"
          name="code"
          label="安全碼"
          type="password"
        />
        <HuiInput
          name="codeConfirmation"
          label="請再輸入一次"
          type="password"
          minlength="4"
          maxlength="4"
        />
        <button
          :disabled="invalid"
          class="btn btn-primary btn-block"
          type="submit"
        >
          變更
        </button>
        <div class="mt-1 text-sm text-red-500">{{ errorMessage }}</div>
        <div class="mt-1 text-sm text-blue-500">{{ successText }}</div>
      </HuiForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import apolloClient from '@/plugins/apolloClient'
  import gql from 'graphql-tag'
  import * as yup from 'yup'

  import HuiForm from '@/components/Shared/HuiForm.vue'
  import HuiInput from '@/components/Shared/HuiInput.vue'
  import { useFetchStore } from '@/stores/fetchStatus'
  import { storeToRefs } from 'pinia'

  const rules = yup.object({
    code: yup.string().required().length(4),
    codeConfirmation: yup
      .string()
      .required()
      .oneOf([yup.ref('code')], 'code do not match'),
  })

  let successText = ref('')
  const { errorMessage } = storeToRefs(useFetchStore())

  const submit = async (values: { code: string }) => {
    const { code } = values

    successText.value = ''

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

    successText.value = '更新成功'
  }
</script>

<style scoped>
  .logo {
    @apply w-56 h-56 bg-cover rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 opacity-50;
    @apply hidden lg:block;

    background-image: url('@/assets/images/logo.jpg');
  }
</style>
