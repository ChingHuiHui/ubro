<template>
  <header>
    <div class="container py-3">
      <div class="flex justify-end space-x-5">
        <div class="">
          <button
            @click="locale = availableLocal"
            v-for="availableLocal in availableLocales"
            :key="`locale-${availableLocal}`"
            class="locale"
            :class="{ active: locale === availableLocal }"
          >
            {{ availableLocal }}
          </button>
          <hr />
        </div>

        <button @click="toggle">
          <hui-icon
            class="text-xl"
            :pack="isDarkMode ? 'fas' : 'far'"
            icon="moon"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  import useDarkMode from '@/compositions/useDarkMode'
  import HuiIcon from '@/components/HuiIcon.vue'

  const { locale, availableLocales } = useI18n()

  const { isDarkMode, toggle } = useDarkMode()
</script>

<style scoped>
  .locale {
    @apply text-gray-300 dark:text-gray-500 transitable w-16;

    &:hover,
    &.active {
      @apply text-gray-500 dark:text-gray-300;
    }

    &:nth-child(1).active ~ hr {
      @apply ml-0;
    }

    &:nth-child(2).active ~ hr {
      @apply ml-16;
    }
  }

  hr {
    @apply w-16 h-1 mt-1 bg-purple-300 border-none transitable;
  }
</style>
