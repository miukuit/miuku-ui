import { createInstaller } from '@miuku-ui/utils'
import { componentList } from './component-list'
import 'virtual:uno.css'

export * from './components'
export * from './hooks'
export * from './resolver'
export * from './types'
export * from './utils/tools'

const installer = createInstaller(componentList)

const install = installer.install
const version = installer.version
export { install, version }
