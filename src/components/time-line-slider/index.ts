import type { SFCWithInstall } from '@miuku-ui/utils'
import { withInstall } from '@miuku-ui/utils'
import TimeLineSlider from './src/time-line-slider.vue'

export const MTimeLineSlider: SFCWithInstall<typeof TimeLineSlider> = withInstall(TimeLineSlider)
export default MTimeLineSlider
