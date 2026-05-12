import type { ComponentResolver } from 'unplugin-vue-components'

export function MiukuUIResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (/^M[A-Z]/.test(name)) {
        return {
          name,
          from: 'miuku-ui',
        }
      }
    },
  }
}
