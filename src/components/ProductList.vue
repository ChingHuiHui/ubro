<template>
  <List :fields="['兌換', '點數', '品項']">
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
        <span>{{ product.point }}</span>
        <span class="truncate">{{ product.name }}</span>
      </div>
    </li>
  </List>
</template>

<script lang="ts" setup>
  import HuiIcon from '@/components/HuiIcon.vue'
  import List from './List.vue'

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
  .product-table /deep/ .product-row {
    &:first-child {
      @apply top-[4.5rem];
    }

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
      span {
        @apply flex-1;
      }

      span:nth-child(3) {
        @apply flex-[2];
      }
    }
  }
</style>
