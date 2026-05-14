import type { SFCWithInstall } from '@miuku-ui/utils'
import { withInstall } from '@miuku-ui/utils'
import ContextMenu from './src/context-menu.vue'

export const MContextMenu: SFCWithInstall<typeof ContextMenu> = withInstall(ContextMenu)
export default MContextMenu
