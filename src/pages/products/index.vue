<template>
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
  import { useQuery, useResult } from '@vue/apollo-composable'
  import gql from 'graphql-tag'

  import ProductList from '@/components/Admin/ProductList.vue'
  import apolloClient from '@/plugins/apolloClient'
  import { useFetch } from '@/compositions/useFetch'
  import { ref, watchEffect } from 'vue'

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

  // const { result } = useQuery(PRODUCT_QUERY)
  // const products = useResult(result, null, (data): Product[] => data.products)

  const products = ref([])

  const fetchProduct = async () => {
    const action = async () => {
      try {
        const { data } = await apolloClient.query({
          query: PRODUCT_QUERY,
        })

        products.value = data.products
      } catch (e) {
        throw e
      }
    }

    await useFetch(action)
  }

  watchEffect(() => {
    fetchProduct()
  })

  const deleteProduct = async (productId: number) => {
    const action = async () => {
      try {
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

            console.log(';PRODUCT_QUERY', PRODUCT_QUERY)

            console.log('data', data)

            if (data) {
              data = {
                products: data.products.filter(
                  ({ id }) => id !== deleteProduct
                ),
              }
            }

            store.writeQuery({
              query: PRODUCT_QUERY,
              data,
            })
          },
        })
      } catch (e) {
        throw e
      }
    }

    await useFetch(action)
  }
</script>
