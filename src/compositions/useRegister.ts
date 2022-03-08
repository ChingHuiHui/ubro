import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { Ref } from 'vue'

export default (phone: Ref<string>) => {
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
          phone: phone.value,
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
