import type { INSTALLED_KEY } from '@miuku-ui/constants'

declare module 'vue' {
  export interface App {
    [INSTALLED_KEY]?: boolean
  }
}

export {}
