<template>
  <div class="container h-full flex lg:items-center">
    <div class="w-full grid lg:grid-cols-2 lg:gap-20">
      <HuiForm
        v-slot="{ invalid, values }"
        :rules="rules"
        :action="submit"
        class="space-y-6"
      >
        <HuiInput name="account" label="Account" required />
        <HuiInput name="password" label="Password" type="password" />
        <div class="flex space-x-4">
          <button class="btn btn-outline-primary btn-block" type="button">
            <router-link class="block" to="/">GoBack</router-link>
          </button>
          <button class="btn btn-primary btn-block" type="submit">Login</button>
        </div>
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

  const rules = yup.object({
    account: yup.string().required(),
    password: yup.string().required().min(8),
  })

  const submit = (values) => {
    // TODO: login
    console.log('login', values)
  }
</script>

<style scoped>
  .logo {
    @apply w-56 h-56 bg-cover rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 opacity-50;
    @apply hidden lg:block;

    background-image: url('@/assets/images/logo.jpg');
  }
</style>
