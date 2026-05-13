<script lang="ts" setup>
import type { CountToProps } from './count-to'
import Decimal from 'decimal.js'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { cancelAnimationFrame, requestAnimationFrame } from './animation-frame'

defineOptions({
  name: 'MCountTo',
})

const props = withDefaults(defineProps<CountToProps>(), {
  startVal: 0,
  endVal: 0,
  duration: 1000,
  mutant: false,
  autoplay: true,
  precision: 0,
  decimal: '.',
  separator: ',',
  useEasing: true,
  easingFn: (t, b, c, d) => c * (-(2 ** (-10 * t / d)) + 1) * 1024 / 1023 + b,
})

const emits = defineEmits<{
  (e: 'mountedCallback'): void
  (e: 'callback'): void
}>()

const rgx = /(\d+)(\d{3})/

const displayValue = ref<string | string[]>(formatNumber(props.startVal))
const paused = ref(false)

let localStartVal = props.startVal
let localDuration = props.duration
let printVal = props.startVal
let startTime: number | null = null
let remaining = props.duration
let rAF: number = 0

const countDown = computed(() => props.startVal > props.endVal)

function formatNumber(num: number): string | string[] {
  const str = Decimal(num).toFixed(props.precision).toString()
  const x = str.split('.')
  let x1 = x[0] || ''
  const x2 = x[1] || ''
  if (props.separator && Number.isNaN(Number.parseFloat(props.separator))) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1${props.separator}$2`)
    }
  }
  return props.mutant ? [x1, x2] : x2 ? `${x1}${props.decimal}${x2}` : x1
}

/**
 * 动画核心计算函数
 * 根据时间戳计算当前数值，并更新显示值
 * @param timestamp 当前动画帧的时间戳
 */
function count(timestamp: number) {
  if (!startTime) {
    startTime = timestamp
  }

  const progress = timestamp - startTime
  remaining = localDuration - progress

  if (localDuration <= 0) {
    printVal = props.endVal
  }
  else if (props.useEasing) {
    printVal = countDown.value
      ? localStartVal - props.easingFn(progress, 0, localStartVal - props.endVal, localDuration)
      : props.easingFn(progress, localStartVal, props.endVal - localStartVal, localDuration)
  }
  else {
    const ratio = Math.min(progress / localDuration, 1)
    printVal = localStartVal + (props.endVal - localStartVal) * ratio
  }

  // 边界夹值
  printVal = countDown.value
    ? Math.max(printVal, props.endVal)
    : Math.min(printVal, props.endVal)

  displayValue.value = formatNumber(printVal)

  if (localDuration > 0 && progress < localDuration) {
    rAF = requestAnimationFrame(count)
  }
  else {
    emits('callback')
  }
}

/**
 * 启动计数器动画
 * 重置本地起始值、持续时间等变量，并开始动画循环
 */
function start() {
  localStartVal = props.startVal
  localDuration = props.duration
  startTime = null
  paused.value = false
  rAF = requestAnimationFrame(count)
}

/**
 * 暂停计数器动画
 * 取消当前的动画帧请求
 */
function pause() {
  cancelAnimationFrame(rAF)
}

/**
 * 恢复计数器动画
 * 从暂停状态继续执行动画
 */
function resume() {
  startTime = null
  localDuration = remaining
  localStartVal = printVal
  rAF = requestAnimationFrame(count)
}

/**
 * 切换暂停/恢复状态
 * 根据当前状态决定是暂停还是恢复动画
 */
function pauseResume() {
  if (paused.value) {
    resume()
  }
  else {
    pause()
  }
  paused.value = !paused.value
}

/**
 * 重置计数器到初始状态
 * 将显示值重置为起始值并停止动画
 */
function reset() {
  startTime = null
  cancelAnimationFrame(rAF)
  displayValue.value = formatNumber(props.startVal)
}

watch(
  () => [props.startVal, props.endVal],
  () => {
    if (props.autoplay) {
      start()
    }
  },
)

onMounted(() => {
  if (props.autoplay) {
    start()
  }
  emits('mountedCallback')
})

onUnmounted(() => {
  cancelAnimationFrame(rAF)
})

defineExpose({
  start,
  pause,
  resume,
  pauseResume,
  reset,
})
</script>

<template>
  <template v-if="mutant">
    <span>{{ displayValue[0] }}</span>
    <span v-if="displayValue[1]" class="text-[0.75em]">.{{ displayValue[1] }}</span>
  </template>
  <template v-else>
    {{ displayValue }}
  </template>
</template>
