export interface CountToProps {
  startVal?: number
  endVal?: number
  /**
   * 持续时间，单位：毫秒
   * @default 1000
   */
  duration?: number
  /**
   * 自动播放
   * @default true
   */
  autoplay?: boolean
  /**
   * 异形大小
   * @default false
   */
  mutant?: boolean
  /**
   * 小数位数
   * @default 0
   */
  precision?: number
  /**
   * 小数分隔符
   * @default '.'
   */
  decimal?: string
  /**
   * 千分位分隔符
   * @default ','
   */
  separator?: string
  /**
   * 是否使用缓动效果
   * @default true
   */
  useEasing?: boolean
  /**
   * 缓和回调
   * @param t 时间
   * @param b 起点
   * @param c 终点
   * @param d 持续时间
   * @returns
   */
  easingFn?: (t: number, b: number, c: number, d: number) => number
}
