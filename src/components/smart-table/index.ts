import type { SFCWithInstall } from '@miuku-ui/utils'
import { withInstall } from '@miuku-ui/utils'
import SmartTable from './src/smart-table.vue'

export const MSmartTable: SFCWithInstall<typeof SmartTable> = withInstall(SmartTable)
export default MSmartTable
