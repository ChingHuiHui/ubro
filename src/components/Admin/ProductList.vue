<template>
  <ul class="product-table py-6 bg-white h-full rounded-t-2xl">
    <li class="product-row p-2 text-gray-800">
      <div>
        <span>品項</span>
        <span>點數</span>
        <span>功能</span>
      </div>
    </li>
    <li v-for="product in products" :key="product.id" class="product-row">
      <div>
        <span>{{ product.name }}</span>
        <span>{{ product.point }}</span>
        <div class="divide-x-2">
          <span class="px-2 cursor-pointer">
            <router-link :to="`/admin/products/${product.id}/update`">
              修改
            </router-link>
          </span>
          <span
            class="text-red-700 px-2 cursor-pointer"
            @click="deleteProduct(product.id)"
          >
            刪除
          </span>
        </div>
      </div>
    </li>
    <DeleteModal
      v-if="modelIsOpen"
      @close="modelIsOpen = false"
      :deleted-id="deletedId"
    />
  </ul>
</template>

<script lang="ts" setup>
  import { readonly, ref, nextTick } from 'vue'

  import DeleteModal from '@/components/Modal/DeleteModal.vue'
  import HuiIcon from '@/components/HuiIcon.vue'

  type Product = {
    id: number
    name: string
    point: number
  }

  defineProps<{
    products: readonly Product[] | null
  }>()

  const modelIsOpen = ref(false)
  const deletedId = ref<number | null>(null)

  const deleteProduct = (id: number) => {
    deletedId.value = id

    nextTick(() => (modelIsOpen.value = true))
  }
</script>

<style scoped>
  .product-table {
    @apply divide-y;

    .product-row {
      @apply p-2 px-6 transitable;

      > div {
        @apply flex items-center;

        span,
        div {
          @apply flex-1;
        }

        span:nth-child(2) {
          @apply flex-[2];
        }
      }
    }
  }
</style>
