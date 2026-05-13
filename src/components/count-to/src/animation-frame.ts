const isServer = typeof window === 'undefined'

type AnimationFrameCallback = (time: number) => void
type RequestAnimationFrameFn = (callback: AnimationFrameCallback) => number
type CancelAnimationFrameFn = (id: number) => void

const browserPrefixes = ['moz', 'webkit', 'o', 'ms'] as const

function createServerStubs() {
  return {
    requestAnimationFrame: (_callback: AnimationFrameCallback): number => 0,
    cancelAnimationFrame: (_id: number): void => {},
  }
}

function createBrowserImpl() {
  let raf: RequestAnimationFrameFn | undefined = window.requestAnimationFrame
  let caf: CancelAnimationFrameFn | undefined = window.cancelAnimationFrame

  // 兼容各浏览器前缀
  for (const prefix of browserPrefixes) {
    if (raf && caf)
      break
    const w = window as unknown as Record<string, unknown>
    raf ??= w[`${prefix}RequestAnimationFrame`] as RequestAnimationFrameFn | undefined
    caf ??= (w[`${prefix}CancelAnimationFrame`] ?? w[`${prefix}CancelRequestAnimationFrame`]) as CancelAnimationFrameFn | undefined
  }

  // 降级到 setTimeout，模拟 60fps
  if (!raf || !caf) {
    let lastTime = 0

    raf = (callback: AnimationFrameCallback): number => {
      const now = Date.now()
      const timeToCall = Math.max(0, 16 - (now - lastTime))
      const id = window.setTimeout(callback, timeToCall, now + timeToCall)
      lastTime = now + timeToCall
      return id
    }

    caf = (id: number): void => window.clearTimeout(id)
  }

  return {
    requestAnimationFrame: raf,
    cancelAnimationFrame: caf,
  }
}

const { requestAnimationFrame, cancelAnimationFrame } = isServer ? createServerStubs() : createBrowserImpl()

export { cancelAnimationFrame, requestAnimationFrame }
export type { AnimationFrameCallback, CancelAnimationFrameFn, RequestAnimationFrameFn }
