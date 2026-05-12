import { createInstaller } from '@miuku-ui/utils'
import { componentList } from './component-list'

export * from './components'
export * from './hooks'
export * from './resolver'
export * from './types'

const installer = createInstaller(componentList)

export const install = installer.install
export const version = installer.version
export default installer
