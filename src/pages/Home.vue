<template>
  <div
    v-if="loading"
    class="fixed inset-0 bg-black bg-opacity-60 flex-center text-white"
  >
    Loading ...
  </div>
  <PhonePad
    v-if="!authStore.isLogin"
    @submit="submit"
    :phone="phone"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watchEffect } from 'vue'

  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'
  import useLogin from '@/compositions/useLogin'
  import PhonePad from '@/components/PhonePad.vue'

  const REMOVE_NUMBER = 10
  const ZERO_NUMBER = 11
  const LOGIN_NUMBER = 12
  const MAX_LENGTH = 10
  const phone = ref('')

  const router = useRouter()
  const authStore = useAuthStore()

  watchEffect(() => {
    if (authStore.isLogin) {
      router.push('/points')
    }
  })

  const isValid = computed(() => {
    return /((?=(09))[0-9]{10})$/g.test(phone.value)
  })

  const { login, onLoginDone, loading } = useLogin(phone)

  const submit = () => {
    login()

    onLoginDone(async (result) => {
      await authStore.setToken(result.data.login.token)
    })
  }

  const handleInput = (number: number | string) => {
    let addNumber = String(number)

    if (number === REMOVE_NUMBER) {
      phone.value = phone.value.slice(0, -1)

      return
    }

    if (number === LOGIN_NUMBER) {
      submit()
      return
    }

    if (number === ZERO_NUMBER) {
      addNumber = '0'
    }

    if (phone.value.length >= MAX_LENGTH) {
      return
    }

    phone.value += addNumber
  }
</script>
