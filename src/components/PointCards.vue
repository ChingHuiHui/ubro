<template>
  <section class="flex-center min-w-[640px] w-3/4">
    <swiper
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      :pagination="{ clickable: true }"
      class="mySwiper"
    >
      <swiper-slide v-for="n in 10" :key="`point-card-${n}`">
        <div class="grid grid-cols-5 gap-6">
          <div v-for="i in 10" :key="`point-${i}`" class="point">
            <span class="tag">UBRO {{ i }}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script lang="ts" setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Pagination, EffectCards } from 'swiper'

  import 'swiper/css'
  import 'swiper/css/pagination'
  import 'swiper/css/effect-cards'

  const modules = [EffectCards, Pagination]
</script>

<style scoped>
  .swiper {
    @apply w-full;
  }

  .swiper-slide {
    @apply flex-center rounded-2xl py-20 bg-gray-100;

    &:not(:first-child) {
      @apply border;
    }
  }

  .point {
    @apply relative w-20 h-20 rounded-full bg-cover xl:w-32 xl:h-32;

    background-image: url('@/assets/images/logo.jpg');

    > .tag {
      @apply border border-red-500 p-px text-red-500 absolute -bottom-2 -left-2;
    }
  }
</style>
