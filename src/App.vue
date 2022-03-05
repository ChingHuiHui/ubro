<template>
  <div class="min-h-screen flex flex-col">
    <default-header />
    <main class="flex-1 flex-center mb-auto">
      <div class="container flex-center">
        <HelloWorld :msg="$t('hello')" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { onBeforeMount, watchEffect } from 'vue'

  import useDarkMode from '@/compositions/useDarkMode'

  import DefaultHeader from '@/components/Layout/DefaultHeader.vue'
  import HelloWorld from '@/components/HelloWorld.vue'

  import IUDark from '@/assets/images/IU.jpg'
  import IULight from '@/assets/images/IU-light.jpg'
  import { preloadAll } from './libs/helpers'

  const { isDarkMode } = useDarkMode()

  watchEffect(() => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
      return
    }

    document.documentElement.classList.remove('dark')
  })

  onBeforeMount(() => {
    preloadAll([IUDark, IULight])
  })
</script>
