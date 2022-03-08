import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default (phone: string) => {
  const {
    mutate: register,
    onDone: onRegisterDone,
    onError: onRegisterError,
  } = useMutation(
    gql`
      mutation register($input: RegisterInput!) {
        register(input: $input) {
          phone
        }
      }
    `,
    () => ({
      variables: {
        input: {
          phone,
        },
      },
    })
  )

  return {
    register,
    onRegisterDone,
    onRegisterError,
  }
}
