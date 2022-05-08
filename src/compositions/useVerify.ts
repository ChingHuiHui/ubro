import { ref } from 'vue'
import { RouteRecordName } from 'vue-router'
import { ROUTE_NAME } from '@/libs/enum'

const isVerify = ref(false)
let intendedPage: RouteRecordName = ROUTE_NAME.HOME

export default function useVerify() {
  function verify(): void {
    isVerify.value = true
  }

  function saveIntendedPage(routeName?: RouteRecordName | null): void {
    if (!routeName) {
      intendedPage = ROUTE_NAME.HOME
      return
    }

    intendedPage = routeName
  }

  return { verify, isVerify, intendedPage, saveIntendedPage }
}
