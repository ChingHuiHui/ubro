import { ref, Ref } from 'vue'
import gql from 'graphql-tag'

import useRegister from '@/compositions/useRegister'
import apolloClient from '@/plugins/apolloClient'
import type { ApolloError } from '@apollo/client'

export type LoginInput = { phone: string; password: string }

export default ({ phone, password }: LoginInput) => {
  const { register } = useRegister(phone)

  const login = async (): Promise<string | undefined> => {
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
            phone,
            password,
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

      throw error
    }
  }

  const adminLogin = async (): Promise<string | undefined> => {
    try {
      const {
        data: { adminLogin },
      } = await apolloClient.mutate({
        mutation: gql`
          mutation adminLogin($input: LoginInput!) {
            adminLogin(input: $input) {
              token
            }
          }
        `,
        variables: {
          input: {
            phone,
            password,
          },
        },
      })

      return adminLogin.token
    } catch (error) {
      throw error
    }
  }

  return {
    login,
    adminLogin,
  }
}
