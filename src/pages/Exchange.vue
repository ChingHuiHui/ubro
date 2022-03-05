<template>
  <div class="flex-center h-full">
    <div class="wrapper flex flex-col h-full">
      <div class="flex-center mb-4 space-x-5">
        <div class="h1 !font-normal inline-block p-2">
          目前有
          <span class="text-primary-dark font-bold mx-1">
            {{ currentPoint }} / 20
          </span>
          點
        </div>
      </div>
      <div class="flex-1 bg-white overflow-y-scroll rounded-t-2xl">
        <div
          class="sticky top-0 bg-white px-6 py-3 shadow flex items-center justify-between"
        >
          <div class="flex items-center space-x-4">
            <span>兌換</span>
            <span
              class="border-b-2 border-b-primary pb-0.5 text-xl font-medium"
            >
              {{ chooseProduct ? chooseProduct.name : '尚未兌換任何商品' }}
            </span>
            <span>
              使用
              <span class="font-medium text-lg">
                {{ chooseProduct ? chooseProduct.point : 0 }}
              </span>
              點
            </span>
          </div>
          <button
            :disabled="!active"
            class="btn btn-primary w-40"
            @click="modalIsOpen = true"
          >
            確認兌換
          </button>
        </div>
        <ProductList :products="products" @change="choose" :active="active" />
      </div>
    </div>
    <ExchangeModal v-if="modalIsOpen" @close="modalIsOpen = false" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import ProductList from '../components/ProductList.vue'
  import ExchangeModal from '../components/ExchangeModal.vue'

  type Product = {
    id: string
    name: string
    point: number
  }

  // TODO: get products from api
  const products: Product[] = [
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

  const modalIsOpen = ref(false)
  const active = ref<string | null>(null)

  const choose = (id: string) => {
    active.value = active.value === id ? null : id
  }

  const chooseProduct = computed((): Product | undefined => {
    return products.find(({ id }) => id === active.value)
  })

  const currentPoint = computed((): number => {
    const cost = chooseProduct.value?.point || 0

    return 20 - cost
  })
</script>
