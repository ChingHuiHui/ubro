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
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as yup from 'yup'
  import { useRouter } from 'vue-router'

  import HuiForm from '@/components/Shared/HuiForm.vue'
  import HuiInput from '@/components/Shared/HuiInput.vue'

  const router = useRouter()

  const rules = yup.object({
    name: yup.string().required(),
    point: yup.number().required(),
  })

  const submit = (values: { name: string; point: number }) => {
    // TODO: create product
    console.log('name', values.name, 'point', values.point)

    router.push('/products')
  }
</script>

<style scoped>
  .logo {
    @apply w-56 h-56 bg-cover rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 opacity-50;
    @apply hidden lg:block;

    background-image: url('@/assets/images/logo.jpg');
  }
</style>
