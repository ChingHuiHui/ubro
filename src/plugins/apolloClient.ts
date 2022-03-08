import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const cache = new InMemoryCache()
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP_ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  // TODO: modify the header (use Authorization)
  if (token) {
    return {
      headers: {
        ...headers,
        'x-token': token || null,
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
  link: authLink.concat(httpLink),
  cache,
})

export default apolloClient
