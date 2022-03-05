<template>
  <div class="flex-center h-full">
    <div class="wrapper flex flex-col h-full">
      <div class="flex-center mb-4">
        <div class="h1 !font-normal bg-primary-light inline-block p-2">
          目前有<span class="text-white font-bold"> 20 </span>點
        </div>
      </div>
      <div class="flex-1 bg-white overflow-y-scroll p-6 rounded-t-2xl">
        <ul class="product-table">
          <li class="product-row p-2 text-gray-800">
            <div>
              <span>兌換</span>
              <span>品項</span>
              <span>點數</span>
            </div>
          </li>
          <li
            @click="choose = product.id"
            v-for="product in products"
            :key="product.id"
            class="product-row cursor-pointer"
            :class="{ active: choose === product.id }"
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HuiIcon from '@/components/HuiIcon.vue'
  import { ref } from 'vue'

  // TODO: get products from api
  const products = [
    { id: '1', name: '拿鐵', point: 10 },
    { id: '2', name: '手沖咖啡', point: 15 },
    { id: '3', name: '茶飲', point: 10 },
    { id: '4', name: '貝果', point: 5 },
    { id: '5', name: '吐司', point: 5 },
    { id: '6', name: '拿鐵', point: 10 },
    { id: '7', name: '手沖咖啡', point: 15 },
    { id: '8', name: '茶飲', point: 10 },
    { id: '9', name: '貝果', point: 5 },
    { id: '10', name: '吐司', point: 5 },
    { id: '11', name: '手沖咖啡', point: 15 },
    { id: '12', name: '茶飲', point: 10 },
    { id: '13', name: '貝果', point: 5 },
    { id: '14', name: '吐司', point: 5 },
  ]

  const choose = ref<string | null>(null)
</script>

<style scoped>
  .product-table {
    @apply divide-y;

    .product-row {
      @apply p-2 transitable;

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
