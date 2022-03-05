export default class LocalStorage {
  set(key: string, value: string, ttl: number = 30): void {
    const data = {
      value,
      ttl: Date.now() + ttl * 10000,
    }

    localStorage.setItem(key, JSON.stringify(data))
  }

  get(key: string) {
    const data = localStorage.getItem(key)

    if (!data) {
      return null
    }

    const { ttl, value } = JSON.parse(data)

    if (Date.now() > ttl) {
      localStorage.removeItem(key)

      return null
    }

    return value
  }
}
