import { ref, Ref } from 'vue'
import gql from 'graphql-tag'

import useRegister from '@/compositions/useRegister'
import apolloClient from '@/plugins/apolloClient'
import type { ApolloError } from '@apollo/client'

export default (phone: Ref<string>) => {
  const { register } = useRegister(phone)

  const login = async () => {
    try {
      const {
        data: { login },
      } = await apolloClient.mutate({
        mutation: gql`
          mutation login($input: LoginInput!) {
            login(input: $input) {
              token
            }
          }
        `,
        variables: {
          input: {
            phone: phone.value,
            password: phone.value,
          },
        },
      })

      return login.token

      // TODO: error's type
    } catch (error) {
      if ((<ApolloError>error).message === 'this phone not register') {
        await register()

        return await login()
      }

      console.error(error)
    }
  }

  return {
    login,
  }
}
