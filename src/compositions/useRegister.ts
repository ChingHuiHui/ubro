import gql from 'graphql-tag'

import apolloClient from '@/plugins/apolloClient'

export default (phone: string) => {
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
            phone,
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
