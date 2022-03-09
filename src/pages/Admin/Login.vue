<template>
  <div class="container h-full flex lg:items-center">
    <div
      v-if="loading"
      class="fixed inset-0 bg-black bg-opacity-60 flex-center text-white"
    >
      Loading ...
    </div>
    <div class="w-full grid lg:grid-cols-2 lg:gap-20">
      <HuiForm
        v-slot="{ values }"
        :rules="rules"
        :action="submit"
        class="space-y-6"
      >
        <HuiInput name="phone" label="Account" required />
        <HuiInput name="password" label="Password" type="password" />
        <div class="flex space-x-4">
          <button class="btn btn-outline-primary btn-block" type="button">
            <router-link class="block" to="/">GoBack</router-link>
          </button>
          <button class="btn btn-primary btn-block" type="submit">Login</button>
        </div>
        <div class="mt-1 text-sm text-red-500">{{ errorText }}</div>
      </HuiForm>
      <div class="row-start-1 flex flex-col lg:col-start-2 lg:-translate-y-1/2">
        <h2 class="h1">管理員登入</h2>
        <div
          class="flex-1 relative text-primary text-[5rem] sm:text-[12.5rem] flex items-center"
        >
          <span class="z-10">Ubro</span>
          <div class="logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as yup from 'yup'

  import HuiForm from '@/components/Shared/HuiForm.vue'
  import HuiInput from '@/components/Shared/HuiInput.vue'
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import { ApolloError } from '@apollo/client'

  const rules = yup.object({
    phone: yup.string().required(),
    password: yup.string().required(),
  })

  const { adminLogin } = useAuthStore()
  const router = useRouter()

  let loading = ref(false)
  let errorText = ref('')

  const submit = async (values: { phone: string; password: string }) => {
    try {
      loading.value = true
      const { phone, password } = values

      await adminLogin({
        phone: phone,
        password: password,
      })

      errorText.value = ''
      loading.value = false
      router.push({ name: 'admin-products.index' })
    } catch (error) {
      errorText.value = (<ApolloError>error).message
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
