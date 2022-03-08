import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default () => {
  const { result } = useQuery(
    gql`
      query me {
        me {
          phone
        }
      }
    `
  )

  const user = useResult(result, '')

  return {
    user,
  }
}
