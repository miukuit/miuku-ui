import { createInstaller } from '@miuku-ui/utils'
import { componentList } from './component-list'
import 'virtual:uno.css'
import './styles/index.css'

export * from './components'
export * from './hooks'
export * from './resolver'
export * from './types'
export * from './utils/tools'

const installer = createInstaller(componentList)

export const install = installer.install
export const version = installer.version
export default installer
