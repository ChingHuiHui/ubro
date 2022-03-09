<template>
  <div class="flex flex-col flex-center">
    <div class="wrapper">
      <PointCards :points="point" class="mb-5" />
      <div
        class="bg-white rounded-2xl p-4 w-[20rem] flex justify-between space-x-4"
      >
        <div class="flex-1 flex items-center space-x-6">
          <button @click="minusNumber" class="btn control-button">
            <HuiIcon icon="minus" />
          </button>
          <div class="flex-1 text-center font-bold text-lg">{{ number }}</div>
          <button @click="addNumber" class="btn control-button">
            <HuiIcon icon="plus" />
          </button>
        </div>
        <button
          class="btn btn-primary stamp-button"
          @click="modalIsOpen = true"
          :disabled="number === 0"
        >
          <HuiIcon icon="stamp" />
        </button>
      </div>
    </div>
    <ConfrimedModal
      v-if="modalIsOpen"
      :number="number"
      @close="modalIsOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import PointCards from '@/components/PointCards.vue'
  import HuiIcon from '@/components/HuiIcon.vue'
  import ConfrimedModal from '../components/Modal/ConfrimedModal.vue'

  import { useAuthStore } from '@/stores/auth'
  import { storeToRefs } from 'pinia'

  // TODO: correct points from api
  const { point } = storeToRefs(useAuthStore())

  const modalIsOpen = ref(false)

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
  .control-button {
    @apply w-14 h-14 text-lg bg-white hover:drop-shadow;
  }
  .stamp-button {
    @apply w-20 h-20 text-2xl hover:drop-shadow-lg;
  }
</style>
