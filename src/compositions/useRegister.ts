import gql from 'graphql-tag'
import apolloClient from '@/plugins/apolloClient'

export default (phone: string) => {
  const register = async () => {
    try {
      await apolloClient.mutate({
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
    } catch (error) {
      throw error
    }
  }

  return {
    register,
  }
}
