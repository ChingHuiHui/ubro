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
              {{ chosenProduct ? chosenProduct.name : '尚未兌換任何商品' }}
            </span>
            <span>
              使用
              <span class="font-medium text-lg">
                {{ chosenProduct ? chosenProduct.point : 0 }}
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
        <div v-if="loading" class="flex-center mt-10 font-medium">
          正在努力尋找有什麼可以兌換的好東西 ...
        </div>
        <ProductList
          v-else
          :products="products"
          @change="choose"
          :active="active"
        />
      </div>
    </div>
    <ExchangeModal v-if="modalIsOpen" @close="modalIsOpen = false" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useQuery, useResult } from '@vue/apollo-composable'
  import gql from 'graphql-tag'

  import ProductList from '@/components/ProductList.vue'
  import ExchangeModal from '@/components/Modal/ExchangeModal.vue'

  type Product = {
    id: number
    name: string
    point: number
  }

  const { result, loading } = useQuery(gql`
    query {
      products {
        id
        name
        point
      }
    }
  `)

  const products = useResult(result, null, (data): Product[] => data.products)

  const modalIsOpen = ref(false)
  const active = ref<number | null>(null)

  const choose = (id: number) => {
    active.value = active.value === id ? null : id
  }

  const chosenProduct = computed((): Product | undefined => {
    if (!Array.isArray(products.value)) {
      return
    }

    return products.value.find(({ id }) => id === active.value)
  })

  const currentPoint = computed((): number => {
    const cost = chosenProduct.value?.point || 0

    return 20 - cost
  })
</script>
