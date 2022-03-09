<template>
  <ul class="product-table py-6">
    <li class="product-row p-2 text-gray-800">
      <div>
        <span>兌換</span>
        <span>品項</span>
        <span>點數</span>
      </div>
    </li>
    <li
      @click="emits('change', product.id)"
      v-for="product in products"
      :key="product.id"
      class="product-row cursor-pointer"
      :class="{
        active: active === product.id,
        'bg-gray-200 bg-opacity-50 pointer-events-none': point < product.point,
      }"
    >
      <div>
        <span>
          <div class="check">
            <HuiIcon icon="check" />
          </div>
        </span>
        <span>{{ product.name }}</span>
        <span>{{ product.point }}</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import HuiIcon from '@/components/HuiIcon.vue'

  type Product = {
    id: number
    name: string
    point: number
  }

  defineProps<{
    products: readonly Product[] | null
    active: number | null
    point: number
  }>()

  const emits = defineEmits(['change'])
</script>

<style scoped>
  .product-table {
    @apply divide-y;

    .product-row {
      @apply p-2 px-6 transitable;

      .check {
        @apply w-10 h-10 rounded-full border flex-center text-gray-300;
      }

      &.active {
        @apply bg-primary-light text-white;

        .check {
          @apply text-white;
        }
      }

      > div {
        @apply flex items-center;

        span {
          @apply flex-1;
        }

        span:nth-child(2) {
          @apply flex-[2];
        }
      }
    }
  }
</style>
