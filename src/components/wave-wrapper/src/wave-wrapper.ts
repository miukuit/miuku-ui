export interface WaveConfig {
  /** 波幅 px */
  amplitude: number
  /** 频率（波数） */
  frequency: number
  /** 相位速度 rad/frame */
  speed: number
  /** 初始相位偏移 */
  phaseOffset: number
  /** 填充透明度 */
  fillAlpha: number
  /** Y 方向额外偏移（波层叠错开） */
  yOffset: number
}

export interface WaveWrapperProps {
  /**
   * 百分比: 0 ~ 100
   * @default 0
   */
  percent?: number
  /**
   * 填充颜色
   * @default '#409eff'
   */
  fill?: string
}
