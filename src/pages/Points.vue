<template>
  <div class="flex flex-col flex-center">
    <div class="min-w-[640px] w-3/4">
      <PointCards :points="points" class="mb-5" />

      <div
        class="bg-white rounded-2xl p-4 w-[20rem] flex justify-between space-x-4"
      >
        <div class="flex-1 flex items-center space-x-6">
          <button @click="minusNumber" class="control-button btn-rounded">
            <HuiIcon icon="minus" />
          </button>
          <div class="flex-1 text-center font-bold text-lg">{{ number }}</div>
          <button @click="addNumber" class="control-button btn-rounded">
            <HuiIcon icon="plus" />
          </button>
        </div>
        <button class="stamp-button btn-rounded">
          <HuiIcon icon="stamp" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PointCards from '@/components/PointCards.vue'
  import HuiIcon from '@/components/HuiIcon.vue'
  import { ref } from 'vue'

  // TODO: correct points from api
  const points = 22

  const number = ref(0)

  const addNumber = (): void => {
    number.value++
  }

  const minusNumber = (): void => {
    if (number.value <= 0) {
      return
    }

    number.value--
  }
</script>

<style scoped>
  .btn-rounded {
    @apply rounded-full;
  }

  .control-button {
    @apply w-14 h-14 text-lg transitable bg-white hover:drop-shadow;
  }
  .stamp-button {
    @apply w-20 h-20 text-2xl bg-primary-light text-white transitable hover:drop-shadow-lg hover:bg-primary-dark;
  }
</style>
