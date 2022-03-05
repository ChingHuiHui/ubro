<template>
  <div class="flex-center h-full w-full">
    <div class="min-w-[640px] w-3/4">
      <div class="phone-input flex items-center">
        <input v-model="phone" maxlength="10" class="flex-1" />
        <div
          v-if="isValid"
          class="w-10 h-10 flex-center rounded-full border border-green-500 text-green-500"
        >
          <HuiIcon icon="check" v-if="isValid" class="text-xl" />
        </div>
      </div>
      <div class="phone-pad">
        <button
          v-for="n in 12"
          :key="n"
          class="phone-button"
          @click="handleClick(n)"
          :class="{ invalid: !isValid, 'login-button': n === LOGIN_NUMBER }"
        >
          <span v-if="n < 10">{{ n }}</span>
          <HuiIcon
            icon="plus"
            class="rotate-45"
            v-else-if="n === REMOVE_NUMBER"
          />
          <span v-else-if="n === ZERO_NUMBER">0</span>
          <HuiIcon
            icon="check"
            v-else-if="n === LOGIN_NUMBER"
            class="check-icon"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import HuiIcon from '@/components/HuiIcon.vue'

  const REMOVE_NUMBER = 10
  const ZERO_NUMBER = 11
  const LOGIN_NUMBER = 12

  const MAX_LENGTH = 10

  const phone = ref('')

  const isValid = computed(() => {
    return /((?=(09))[0-9]{10})$/g.test(phone.value)
  })

  const handleClick = (number: number) => {
    let addNumber = number

    if (number === REMOVE_NUMBER) {
      phone.value = phone.value.slice(0, -1)

      return
    }

    if (number === LOGIN_NUMBER) {
      // TODO: login
      return
    }

    if (number === ZERO_NUMBER) {
      addNumber = 0
    }

    if (phone.value.length >= MAX_LENGTH) {
      return
    }

    phone.value += addNumber
  }
</script>

<style scoped>
  .phone-input {
    @apply border bg-white rounded-lg w-full mb-4 p-4 text-4xl min-h-[74px];
  }
  .phone-pad {
    @apply grid grid-cols-3 gap-6;

    .phone-button {
      @apply text-2xl text-center p-4 rounded-lg bg-white transitable;

      &:hover,
      &:active {
        @apply bg-primary-light text-white;
      }

      .check-icon {
        @apply block mx-auto border-green-500 text-green-500 text-2xl;
      }

      &.invalid.login-button {
        @apply pointer-events-none;

        .check-icon {
          @apply !text-red-500;
        }
      }
    }
  }
</style>
