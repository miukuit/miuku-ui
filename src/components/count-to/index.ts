import type { SFCWithInstall } from '@miuku-ui/utils'
import { withInstall } from '@miuku-ui/utils'
import CountTo from './src/count-to.vue'

export const MCountTo: SFCWithInstall<typeof CountTo> = withInstall(CountTo)
export default MCountTo
