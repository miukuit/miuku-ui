<script lang="ts" setup>
import type { WaveConfig, WaveWrapperProps } from './wave-wrapper'
import { toRgba } from '@miuku-ui/utils'
import Konva from 'konva'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions({
  name: 'MWaveWrapper',
})

const props = withDefaults(defineProps<WaveWrapperProps>(), {
  percent: 0,
  fill: '#409eff',
})

const containerRef = ref<HTMLDivElement>()

let stage: Konva.Stage | null = null
let layer: Konva.Layer | null = null
let waveAnim: Konva.Animation | null = null
let resizeObserver: ResizeObserver | null = null

const WAVE_LAYERS: WaveConfig[] = [
  { amplitude: 14, frequency: 1.5, speed: 0.047, phaseOffset: 0, fillAlpha: 0.35, yOffset: -2 },
  { amplitude: 8, frequency: 1.8, speed: 0.038, phaseOffset: 7, fillAlpha: 0.55, yOffset: 3 },
  { amplitude: 10, frequency: 2.3, speed: 0.021, phaseOffset: 3, fillAlpha: 0.75, yOffset: 0 },
]

const phases = WAVE_LAYERS.map(w => w.phaseOffset)

// Math.PI * 2 提升为常量，避免每帧重复计算
const TWO_PI = Math.PI * 2

// ─── percent 边界判断 ────────────────────────────────────────────

function isFull(pct: number) {
  return pct >= 100
}
function isEmpty(pct: number) {
  return pct <= 0
}

// ─── 波浪绘制 ────────────────────────────────────────────────────

/**
 * @param isLast 是否为最后一层，用于 percent=100 时的兜底填充
 */
function createWaveShape(
  cfg: WaveConfig,
  phaseRef: { value: number },
  isLast: boolean,
): Konva.Shape {
  return new Konva.Shape({
    listening: false,
    sceneFunc(ctx, shape) {
      const s = shape.getStage()!
      const W = s.width()
      const H = s.height()
      const pct = Math.min(Math.max(props.percent, 0), 100)

      // 边界处理：
      // percent=0  → 全部跳过，不绘制任何内容
      // percent=100 → 仅最后一层用 fill 原色填满，避免多层 fillAlpha 叠加造成色差
      if (isEmpty(pct) || isFull(pct)) {
        if (isFull(pct) && isLast) {
          ctx.beginPath()
          ctx.rect(0, 0, W, H)
          ctx.fillStyle = props.fill
          ctx.fill()
        }
        return
      }

      // clamp waterY：yOffset 在 pct 极小/极大时可能将水位线推出画布
      const waterY = Math.min(Math.max(H * (1 - pct / 100) + cfg.yOffset, 0), H)

      ctx.beginPath()
      ctx.moveTo(0, waterY)

      // 步长取 2px 精度；循环至 stepCount-1，右端点由 lineTo(W, H) 封口，避免重复顶点
      const stepCount = Math.ceil(W / 2)
      for (let i = 0; i < stepCount; i++) {
        const x = (i / stepCount) * W
        const y = waterY + Math.sin(
          (x / W) * TWO_PI * cfg.frequency + phaseRef.value,
        ) * cfg.amplitude
        ctx.lineTo(x, Math.min(Math.max(y, 0), H))
      }

      ctx.lineTo(W, H)
      ctx.lineTo(0, H)
      ctx.closePath()

      ctx.fillStyle = toRgba(props.fill, cfg.fillAlpha)
      ctx.fill()
    },
  })
}

// ─── Konva 生命周期 ──────────────────────────────────────────────

function initKonva() {
  const el = containerRef.value
  if (!el)
    return

  const W = el.offsetWidth || 300
  const H = el.offsetHeight || 300

  stage = new Konva.Stage({ container: el, width: W, height: H })
  layer = new Konva.Layer()
  stage.add(layer)

  const phaseRefs = phases.map(p => ({ value: p }))
  const lastIndex = WAVE_LAYERS.length - 1

  WAVE_LAYERS.forEach((cfg, i) => {
    layer!.add(createWaveShape(cfg, phaseRefs[i], i === lastIndex))
  })

  waveAnim = new Konva.Animation(() => {
    WAVE_LAYERS.forEach((cfg, i) => {
      // 取模防止浮点数长时间累加后精度退化（sin 输入值过大时出现抖动）
      phaseRefs[i].value = (phaseRefs[i].value + cfg.speed) % TWO_PI
    })
  }, layer)

  waveAnim.start()
}

function resizeKonva() {
  const el = containerRef.value
  if (!stage || !el)
    return
  stage.width(el.offsetWidth)
  stage.height(el.offsetHeight)
  layer?.batchDraw()
}

watch(() => [props.percent, props.fill], () => {
  layer?.batchDraw()
})

onMounted(() => {
  initKonva()
  resizeObserver = new ResizeObserver(resizeKonva)
  if (containerRef.value)
    resizeObserver.observe(containerRef.value)
})

onBeforeUnmount(() => {
  waveAnim?.stop()
  stage?.destroy()
  resizeObserver?.disconnect()
})
</script>

<template>
  <div ref="containerRef" class="m-wave-wrapper" />
</template>

<style lang="scss" scoped>
.m-wave-wrapper {
  height: 100%;
  width: 100%;
}
</style>
