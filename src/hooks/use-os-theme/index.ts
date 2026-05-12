import type { BasicThemeType } from '@miuku-ui/types'
import type { Ref } from 'vue'
import { getCurrentInstance, onBeforeMount, onBeforeUnmount, readonly, ref } from 'vue'

type OsThemeType = BasicThemeType | null

// 服务端渲染或浏览器是否支持
const supportMatchMedia = typeof window !== 'undefined' && window.matchMedia !== undefined

// MediaQueryList 实例引用
let darkMediaQuery: MediaQueryList | null = null
let lightMediaQuery: MediaQueryList | null = null

/**
 * usedCount的作用
 * 1. 避免重复初始化：确保 initListener() 只在第一个组件使用时执行一次
 * 2. 防止内存泄漏：精确控制清理时机
 * 3. 确保状态同步：所有组件共享同一状态
 */
let usedCount = 0

// 存储操作系统当前主题的响应式引用
const osTheme = ref<OsThemeType>(null)

function hasInstance(): boolean {
  return getCurrentInstance() !== null
}

function darkMediaQueryChange(e: MediaQueryListEvent): void {
  if (e.matches) {
    osTheme.value = 'dark'
  }
}
function lightMediaQueryChange(e: MediaQueryListEvent): void {
  if (e.matches) {
    osTheme.value = 'light'
  }
}

// 初始化监听
function initListener() {
  darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  lightMediaQuery = window.matchMedia('(prefers-color-scheme: light)')
  if (darkMediaQuery.matches) {
    osTheme.value = 'dark'
  }
  else if (lightMediaQuery.matches) {
    osTheme.value = 'light'
  }
  else {
    osTheme.value = null
  }
  if (darkMediaQuery.addEventListener) {
    darkMediaQuery.addEventListener('change', darkMediaQueryChange)
    lightMediaQuery.addEventListener('change', lightMediaQueryChange)
  }
  else if (darkMediaQuery.addListener) {
    // 兼容旧版本浏览器
    darkMediaQuery.addListener(darkMediaQueryChange)
    lightMediaQuery.addListener(lightMediaQueryChange)
  }
}
// 销毁监听器
function destroyListener() {
  if (darkMediaQuery?.removeEventListener) {
    darkMediaQuery.removeEventListener('change', darkMediaQueryChange)
    lightMediaQuery?.removeEventListener('change', lightMediaQueryChange)
  }
  else if (darkMediaQuery?.removeListener) {
    // 兼容旧版本浏览器
    darkMediaQuery.removeListener(darkMediaQueryChange)
    lightMediaQuery?.removeListener(lightMediaQueryChange)
  }
}

export function useOsTheme(): Readonly<Ref<OsThemeType>> {
  if (!supportMatchMedia) {
    return readonly(osTheme)
  }
  // 在服务端不执行监听逻辑
  if (typeof window === 'undefined') {
    return readonly(osTheme)
  }
  if (usedCount === 0) {
    // 只有第一个使用者初始化监听器
    initListener()
  }
  if (hasInstance()) {
    // 统一管理生命周期
    onBeforeMount(() => {
      usedCount += 1
    })
    onBeforeUnmount(() => {
      usedCount -= 1
      if (usedCount === 0) {
        // 最后一个使用者清理资源
        destroyListener()
      }
    })
  }
  return readonly(osTheme)
}
