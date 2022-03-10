<template>
  <div
    v-if="loading"
    class="fixed inset-0 bg-black bg-opacity-60 flex-center text-white z-50"
  >
    Loading ...
  </div>
  <div class="flex justify-end mb-5">
    <button class="btn btn-primary w-40">
      <router-link class="block" to="/admin/products/create">
        新增
      </router-link>
    </button>
  </div>
  <ProductList :products="products" @delete-product="deleteProduct" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useQuery, useResult } from '@vue/apollo-composable'
  import gql from 'graphql-tag'

  import ProductList from '@/components/Admin/ProductList.vue'
  import apolloClient from '@/plugins/apolloClient'

  export type Product = {
    id: number
    name: string
    point: number
  }

  const PRODUCT_QUERY = gql`
    query {
      products {
        id
        name
        point
      }
    }
  `

  const { result } = useQuery(PRODUCT_QUERY)
  const products = useResult(result, null, (data): Product[] => data.products)

  const loading = ref(false)

  const deleteProduct = async (productId: number) => {
    try {
      loading.value = true

      await apolloClient.mutate({
        mutation: gql`
          mutation deleteProduct($id: Int!) {
            deleteProduct(id: $id)
          }
        `,
        variables: {
          id: productId,
        },
        update: (store, { data: { deleteProduct } }): void => {
          let data: { products: Product[] } | null = store.readQuery({
            query: PRODUCT_QUERY,
          })

          if (data) {
            data = {
              products: data.products.filter(({ id }) => id !== deleteProduct),
            }
          }

          store.writeQuery({
            query: PRODUCT_QUERY,
            data,
          })
        },
      })

      loading.value = false
    } catch (e) {
      throw e
    }
  }
</script>
