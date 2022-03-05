<template>
  <section class="flex-center min-w-[640px] w-3/4">
    <swiper
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      :pagination="{ clickable: true }"
    >
      <swiper-slide
        v-for="(page, pageNumber) in pages"
        :key="`point-card-${page}`"
      >
        <div class="grid grid-cols-5 gap-6">
          <div
            v-for="pointNumber in POINTS_PER_PAGE"
            :key="`point-${getNumber(pageNumber, pointNumber)}`"
            class="point"
            :class="{ 'have-stamp': haveStamp(pageNumber, pointNumber) }"
          >
            <span class="tag">
              UBRO {{ getNumber(pageNumber, pointNumber) }}
            </span>
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

  const POINTS_PER_PAGE = 10

  const props = defineProps<{ points: number }>()

  const pages = Math.ceil(props.points / POINTS_PER_PAGE)

  const getNumber = (pageNumber: number, pointNumber: number): number => {
    return (pages - 1 - pageNumber) * POINTS_PER_PAGE + pointNumber
  }

  const haveStamp = (pageNumber: number, pointNumber: number): boolean => {
    return getNumber(pageNumber, pointNumber) <= props.points
  }
</script>

<style scoped>
  .swiper {
    @apply w-full;
  }

  .swiper-slide {
    @apply flex-center rounded-2xl py-20 bg-gray-100;

    &:not(.swiper-slide-active) {
      @apply border;
    }
  }

  .point {
    @apply relative w-20 h-20 rounded-full bg-cover xl:w-28 xl:h-28;
    @apply border border-primary;

    > .tag {
      @apply border border-red-500 p-px text-red-500 absolute -bottom-2 -left-2 hidden;
    }

    &.have-stamp {
      background-image: url('@/assets/images/logo.jpg');

      > .tag {
        @apply block;
      }
    }
  }
</style>
