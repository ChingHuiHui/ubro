/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// vite env variable : https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
interface ImportMetaEnv {
  readonly VITE_GRAPHQL_HTTP_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
