import gql from 'graphql-tag'
import type { Ref } from 'vue'

import apolloClient from '@/plugins/apolloClient'

export default (phone: Ref<string>) => {
  const register = async () => {
    try {
      const {
        data: { login },
      } = await apolloClient.mutate({
        mutation: gql`
          mutation register($input: RegisterInput!) {
            register(input: $input) {
              phone
            }
          }
        `,
        variables: {
          input: {
            phone: phone.value,
          },
        },
      })

      // TODO: error's type
    } catch (error) {
      console.error('error')
    }
  }

  return {
    register,
  }
}
