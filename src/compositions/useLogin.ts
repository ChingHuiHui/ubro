import gql from 'graphql-tag'
import apolloClient from '@/plugins/apolloClient'

export type LoginInput = { phone: string; password: string }

export default ({ phone, password }: LoginInput) => {
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
    } catch (error) {
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
