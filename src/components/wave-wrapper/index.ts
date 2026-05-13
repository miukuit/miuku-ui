import type { SFCWithInstall } from '@miuku-ui/utils'
import { withInstall } from '@miuku-ui/utils'
import WaveWrapper from './src/wave-wrapper.vue'

export const MWaveWrapper: SFCWithInstall<typeof WaveWrapper> = withInstall(WaveWrapper)
export default MWaveWrapper
