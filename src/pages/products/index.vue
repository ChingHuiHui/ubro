<template>
  <div class="flex justify-end mb-5">
    <button class="btn btn-primary w-40">
      <router-link class="block" to="/admin/products/create">
        新增
      </router-link>
    </button>
  </div>
  <ProductList :products="products" />
</template>

<script lang="ts" setup>
  import { useQuery, useResult } from '@vue/apollo-composable'
  import gql from 'graphql-tag'

  import ProductList from '@/components/Admin/ProductList.vue'

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
</script>
