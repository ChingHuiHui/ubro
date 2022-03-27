import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { useFetchStore } from '@/stores/fetchStatus'

const errorHandler = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    const { message } = graphQLErrors[0]

    useFetchStore().setErrorMessage(message)
  }
})

let requests = 0

const createFetcher = async (uri: string, options: object) => {
  useFetchStore().setErrorMessage('')

  requests++

  if (requests === 1 && !useFetchStore().loading) {
    useFetchStore().setLoading(true)
  }

  const response = await fetch(uri, options)

  setTimeout(() => {
    requests--

    if (requests === 0 && useFetchStore().loading) {
      useFetchStore().setLoading(false)
    }
  }, 300)

  return response
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        PRODUCT_QUERY: {
          merge: true,
        },
      },
    },
  },
})

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP_ENDPOINT,
  fetch: createFetcher,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: token || null,
      },
    }
  }

  return {
    headers: {
      ...headers,
    },
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(errorHandler.concat(httpLink)),
  cache,
})

export default apolloClient
