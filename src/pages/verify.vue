<template>
  <div class="flex justify-center">
    <HuiForm
      v-slot="{ invalid }"
      :rules="rules"
      :action="submit"
      class="w-64 space-y-6 bg-white p-4 rounded-2xl"
    >
      <HuiInput
        minlength="4"
        maxlength="4"
        name="code"
        label="安全碼"
        type="password"
      />
      <button
        :disabled="invalid"
        class="btn btn-primary btn-block"
        type="submit"
      >
        確認
      </button>
      <div class="mt-1 text-sm text-red-500">{{ errorMessage }}</div>
    </HuiForm>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import apolloClient from '@/plugins/apolloClient'
  import gql from 'graphql-tag'
  import * as yup from 'yup'

  import HuiForm from '@/components/Shared/HuiForm.vue'
  import HuiInput from '@/components/Shared/HuiInput.vue'
  import useVerify from '@/compositions/useVerify'
  import { useRouter } from 'vue-router'

  const rules = yup.object({
    code: yup.string().required().length(4),
  })

  const { verify, intendedPage } = useVerify()
  const router = useRouter()

  const errorMessage = ref('')

  const submit = async (values: { code: string }) => {
    const { code } = values

    const {
      data: { checkSecurityCode },
    } = await apolloClient.query({
      query: gql`
        query checkSecurityCode($code: String!) {
          checkSecurityCode(code: $code)
        }
      `,
      variables: {
        code,
      },
    })

    if (checkSecurityCode === 'SECURITY_CODE_IS_NOT_CORRECT') {
      errorMessage.value = '安全碼錯誤'
      return
    }

    verify()
    router.push({ name: intendedPage })
  }
</script>
