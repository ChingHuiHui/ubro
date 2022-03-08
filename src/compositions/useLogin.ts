import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import useRegister from '@/compositions/useRegister'
import { Ref } from 'vue'

export default (phone: Ref<string>) => {
  const { register, onRegisterError, onRegisterDone } = useRegister(phone)

  // FIXME: 重複打login, register (第一次登入)
  const {
    mutate: login,
    onError: onLoginError,
    onDone: onLoginDone,
    loading,
  } = useMutation(
    gql`
      mutation login($input: LoginInput!) {
        login(input: $input) {
          token
        }
      }
    `,
    () => ({
      variables: {
        input: {
          phone: phone.value,
          password: phone.value,
        },
      },
    })
  )

  onLoginError((error) => {
    console.log('error!!')
    if (error.message === 'this phone not register') {
      register()

      return
    }

    console.error(error)
  })

  onRegisterDone(() => {
    console.log('onRegisterDone!!')
    login()
  })

  onRegisterError((error) => {
    console.error(error)
  })

  return {
    login,
    loading,
    onLoginDone,
  }
}
