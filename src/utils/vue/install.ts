import type { App, Plugin } from 'vue'
import type { SFCWithInstall } from './types'
import { INSTALLED_KEY } from '@miuku-ui/constants'
import { version } from './../../../package.json'

// 为组件添加install方法，用于Vue插件安装
export function withInstall<T, E extends Record<string, any>>(main: T, extra?: E) {
  ;(main as SFCWithInstall<T>).install = (app: App): void => {
    // 遍历主组件和额外组件，将它们注册为全局组件
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }
  // 如果存在额外组件，将它们添加到主组件对象上
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  // 返回带有安装方法的组件对象
  return main as SFCWithInstall<T> & E
}

export function createInstaller(components: Plugin[] = []) {
  const install = (app: App) => {
    // 如果已安装，直接返回，防止组件、指令、全局方法等被重复注册
    if (app[INSTALLED_KEY]) {
      return
    }
    app[INSTALLED_KEY] = true
    components.forEach(c => app.use(c))
  }

  return {
    version,
    install,
  }
}
