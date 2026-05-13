/**
 * 颜色格式类型定义
 */
type ColorFormat = 'hex' | 'rgb' | 'rgba'

/**
 * RGB 颜色值接口
 */
interface RGBColor {
  r: number
  g: number
  b: number
  a?: number
}

/**
 * 颜色转换配置
 */
interface ColorOptions {
  format?: ColorFormat
  precision?: number // 小数精度（0-100）
}

/**
 * 批量转换结果
 */
interface BatchResult {
  success: boolean
  value: string
  error?: string
}

// ─── 内部工具函数 ────────────────────────────────────────────────

/**
 * 将 HEX 转换为 RGB 对象
 * 支持 #rgb / #rrggbb / #rrggbbaa
 */
function hexToRgb(hex: string): RGBColor {
  const clean = hex.replace('#', '')

  const expanded
    = clean.length === 3 || clean.length === 4
      ? clean.split('').map(c => c + c).join('')
      : clean

  if (!/^[\da-f]{6}(?:[\da-f]{2})?$/i.test(expanded)) {
    throw new Error(`Invalid HEX color: "${hex}"`)
  }

  const r = Number.parseInt(expanded.slice(0, 2), 16)
  const g = Number.parseInt(expanded.slice(2, 4), 16)
  const b = Number.parseInt(expanded.slice(4, 6), 16)
  const a = expanded.length === 8
    ? Number.parseInt(expanded.slice(6, 8), 16) / 255
    : undefined

  return { r, g, b, a }
}

/**
 * 将 RGB/RGBA 字符串转换为 RGB 对象
 * 支持空格不规则、整数/小数 alpha
 */
function rgbStringToObject(rgbStr: string): RGBColor {
  const match = rgbStr.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d.]+)\s*)?\)$/,
  )
  if (!match) {
    throw new Error(`Invalid RGB/RGBA color: "${rgbStr}"`)
  }

  const r = Number.parseInt(match[1])
  const g = Number.parseInt(match[2])
  const b = Number.parseInt(match[3])

  for (const [name, val] of [['r', r], ['g', g], ['b', b]] as const) {
    if (val < 0 || val > 255) {
      throw new Error(`Channel "${name}" out of range (0–255): ${val}`)
    }
  }

  return {
    r,
    g,
    b,
    a: match[4] !== undefined ? Number.parseFloat(match[4]) : undefined,
  }
}

/**
 * 将 RGB 对象转换为 HEX 字符串
 */
function rgbToHex({ r, g, b }: RGBColor): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * 将 RGB 对象格式化为目标颜色字符串
 */
function formatColor(color: RGBColor, format: ColorFormat, precision: number): string {
  const { r, g, b, a = 1 } = color
  switch (format) {
    case 'hex': return rgbToHex(color)
    case 'rgb': return `rgb(${r}, ${g}, ${b})`
    case 'rgba': return `rgba(${r}, ${g}, ${b}, ${a.toFixed(precision)})`
    default: return rgbToHex(color)
  }
}

/**
 * 解析任意颜色字符串为 RGB 对象
 */
function parseColor(color: string): RGBColor {
  const trimmed = color.trim()
  if (!trimmed)
    throw new Error('Color must be a non-empty string')

  if (trimmed.startsWith('#'))
    return hexToRgb(trimmed)
  if (trimmed.startsWith('rgb'))
    return rgbStringToObject(trimmed)

  throw new Error(`Unsupported color format: "${color}". Use HEX or RGB/RGBA.`)
}

/**
 * 校验 opacity 合法性
 */
function assertOpacity(opacity: number): void {
  if (opacity < 0 || opacity > 1) {
    throw new RangeError(`Opacity must be between 0 and 1, got: ${opacity}`)
  }
}

// ─── 公共 API ────────────────────────────────────────────────────

/**
 * 将颜色设置为指定透明度并返回目标格式
 * @param color   原始颜色（#rgb | #rrggbb | rgb() | rgba()）
 * @param opacity 透明度（0–1）
 * @param options 输出格式与精度配置
 */
export function setColorOpacity(
  color: string,
  opacity: number,
  options: ColorOptions = {},
): string {
  assertOpacity(opacity)
  const { format = 'rgba', precision = 2 } = options
  const rgb = parseColor(color)
  return formatColor({ ...rgb, a: opacity }, format, precision)
}

/**
 * 返回 RGBA 格式
 */
export function toRgba(color: string, opacity: number, precision = 2): string {
  return setColorOpacity(color, opacity, { format: 'rgba', precision })
}

/**
 * 返回 HEX 格式（透明度仅用于计算，不编码进 HEX）
 */
export function toHex(color: string): string {
  return setColorOpacity(color, 1, { format: 'hex' })
}

/**
 * 批量转换，失败项记录错误而不中断整体
 */
export function batchSetOpacity(
  colors: string[],
  opacity: number,
  options: ColorOptions = {},
): BatchResult[] {
  return colors.map((color) => {
    try {
      return { success: true, value: setColorOpacity(color, opacity, options) }
    }
    catch (err) {
      return { success: false, value: color, error: (err as Error).message }
    }
  })
}
