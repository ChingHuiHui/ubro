<template>
  <div
    :class="{
      'is-open': imageIsOpen,
    }"
    class="mask"
    @click="toggleAnimation"
  />
  <div class="relative min-w-[18.25rem] md:min-w-[30rem]">
    <img
      ref="image"
      class="image"
      :src="imageUrl"
      draggable="false"
      @click="toggleAnimation"
    />
    <section class="relative pointer-events-none z-10">
      <h1 class="h1 mb-4 lg:mb-6">{{ msg }}</h1>
      <div class="py-2 text-sm">
        <div v-if="loading">{{ $t('loading') }}</div>
        <p v-if="greeting">{{ greeting }}</p>
      </div>
      <div class="mb-4 lg:mb-6">
        <h2 class="h2">{{ $t('My name is') }} {{ $t(`${name}`) }}</h2>
        <p class="text-purple-300">{{ $t(`${description}`) }}</p>
      </div>
      <div class="space-x-4 pointer-events-auto">
        <a
          v-for="{ link, icon: { pack, name } } in contact"
          :key="name"
          class="link text-2xl"
          :href="link"
          target="_blank"
        >
          <hui-icon :pack="pack" :icon="name" />
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed, onMounted, ref, Ref } from 'vue'

  import { useQuery, useResult } from '@vue/apollo-composable'
  import gql from 'graphql-tag'

  import useDarkMode from '@/compositions/useDarkMode'
  import { useUserStore } from '@/stores/user'

  import IUDark from '@/assets/images/IU.jpg'
  import IULight from '@/assets/images/IU-light.jpg'

  import HuiIcon from './HuiIcon.vue'

  import gsap, { Power1 } from 'gsap'

  defineProps<{ msg: string }>()

  let tl: GSAPTimeline

  const imageIsOpen = ref(false)
  const image: Ref<HTMLElement | null> = ref(null)

  onMounted(() => {
    const imageSelector = '.image'

    tl = gsap
      .timeline({ paused: true, reversed: true })
      .to(imageSelector, 0.3, {
        clipPath: 'circle(0%)',
        ease: Power1.easeIn,
        scale: 1,
      })
      .to(
        imageSelector,
        0.1,
        {
          position: 'fixed',
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
        },
        '+=0.5'
      )
      .to(
        imageSelector,
        0.3,
        {
          clipPath: 'circle(50%)',
          'min-width': 600,
          zIndex: 50,
          opacity: 100,
          ease: Power1.easeOut,
        },
        '+=0.6'
      )
  })

  const resetStyle = () => {
    if (!image.value) {
      return
    }

    const elementStyle = image.value.style

    for (let prop in elementStyle) {
      if (!elementStyle.hasOwnProperty(prop)) {
        return
      }

      elementStyle.removeProperty(prop)
    }
  }

  const toggleAnimation = () => {
    if (tl.isActive()) {
      return
    }

    imageIsOpen.value = !imageIsOpen.value

    tl.reversed() ? tl.play() : tl.reversed(true).then(() => resetStyle())
  }

  const { isDarkMode } = useDarkMode()

  const userStore = useUserStore()

  const { name, description, github, email, position, age } =
    storeToRefs(userStore)

  const imageUrl = computed(() => {
    return isDarkMode.value ? IUDark : IULight
  })

  const contact = [
    { link: `mailto:${email.value}`, icon: { pack: 'fas', name: 'envelope' } },
    { link: github.value, icon: { pack: 'fab', name: 'github' } },
  ]

  const { result, loading } = useQuery(gql`
    query {
      greeting
    }
  `)

  const greeting = useResult(result, '')
</script>

<style scoped>
  .image {
    @apply absolute top-10 right-0 md:top-0 cursor-pointer;
    @apply w-48 opacity-70 transition-all duration-500 cursor-pointer;

    clip-path: circle(50%);

    &:hover {
      @apply opacity-80 transform scale-150;
    }
  }

  .mask {
    @apply transition-all duration-1000 delay-1000;
    @apply pointer-events-none z-40;

    &.is-open {
      @apply fixed inset-0 bg-black opacity-40 pointer-events-auto cursor-pointer;
    }
  }
</style>
