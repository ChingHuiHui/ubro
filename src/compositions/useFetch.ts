import { ref } from 'vue'

export const loading = ref(false)

export function setLoading(status: boolean): void {
  loading.value = status
}

export async function useFetch(action: Function): Promise<void> {
  setLoading(true)

  await action()

  setLoading(false)
}

export default {}
