<template>
  <div>
    <PhonePad @submit="submit" :phone="phone" @input="handleInput" />
    <RegisterModal v-if="modalIsOpen" @submit="register" @close="close" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watchEffect } from 'vue'

  import { useRouter } from 'vue-router'

  import { storeToRefs } from 'pinia'
  import { useAuthStore } from '@/stores/auth'
  import { ApolloError } from '@apollo/client/errors'

  import RegisterModal from '@/components/Modal/RegisterModal.vue'
  import PhonePad from '@/components/PhonePad.vue'
  import { ERROR_CODE } from '@/libs/enum'

  const REMOVE_NUMBER = 10
  const ZERO_NUMBER = 11
  const LOGIN_NUMBER = 12
  const MAX_LENGTH = 10

  const modalIsOpen = ref(false)
  const phone = ref('')

  const close = () => {
    modalIsOpen.value = false
    phone.value = ''
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

  const router = useRouter()
  const { isLogin } = storeToRefs(useAuthStore())
  const { authLogin, authRegister } = useAuthStore()

  watchEffect(() => {
    if (isLogin.value) {
      router.push('/points')
    }
  })

  const register = async () => {
    modalIsOpen.value = false
    await authRegister({ phone: phone.value })

    alert('完成')
  }

  const submit = async () => {
    try {
      await authLogin({ phone: phone.value, password: phone.value })
    } catch (error) {
      if ((<ApolloError>error).message === ERROR_CODE.PHONE_NOT_REGISTER) {
        modalIsOpen.value = true
      }
    } finally {
    }
  }
</script>
