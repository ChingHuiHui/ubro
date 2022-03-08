<template>
  <div
    v-if="loading"
    class="fixed inset-0 bg-black bg-opacity-60 flex-center text-white"
  >
    Loading ...
  </div>
  <PhonePad v-if="!authStore.isLogin" @submit="submit" />
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watchEffect } from 'vue'

  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'
  import useLogin from '@/compositions/useLogin'
  import PhonePad from '@/components/PhonePad.vue'

  const MAX_LENGTH = 10

  const phone = ref('')

  const router = useRouter()

  const isValid = computed(() => {
    return /((?=(09))[0-9]{10})$/g.test(phone.value)
  })

  const authStore = useAuthStore()

  const { login, onLoginDone, loading } = useLogin(phone.value)

  const submit = () => {
    login()

    onLoginDone(async (result) => {
      await authStore.setToken(result.data.login.token)
    })
  }

  watchEffect(() => {
    if (authStore.isLogin) {
      router.push('/points')
    }
  })
</script>
