import type { BasicSizeType } from '@miuku-ui/types'
import type { Component, VNode } from 'vue'

/** 位置坐标 */
export interface ContextMenuPosition {
  /** 水平偏移量(px) */
  x: number
  /** 垂直偏移量(px) */
  y: number
}

export type OpenDirection = 'left' | 'right'

export interface ContextMenuItem {
  /** 菜单项名称 */
  label: string
  /** 菜单项唯一标识 */
  key?: string | number
  /** 图标，支持字符串或Vue组件 */
  icon?: string | VNode | Component
  /** 是否禁用菜单项 */
  disabled?: boolean
  /** 是否在上方显示分割线 */
  divided?: boolean
  /** 快捷键显示文本 */
  shortcut?: string
  /** 自定义类名 */
  customClass?: string
  /** 子菜单项 */
  children?: ContextMenuItem[]
  /** 点击回调 */
  onClick?: (item: ContextMenuItem) => void | Promise<void>
}

export interface ContextMenuProps {
  /** 菜单项配置数组 */
  menus: ContextMenuItem[]
  /** 控制菜单显示/隐藏 */
  visible: boolean
  /** 菜单弹出位置 */
  position: ContextMenuPosition
  /** 大小 */
  size?: BasicSizeType
  /**
   * z-index层级
   * @default 2000
   */
  zIndex?: number
  /**
   * 菜单最小宽度(px)
   * @default 200
   */
  minWidth?: number
  /**
   * 菜单最大宽度(px)
   * @default 400
   */
  maxWidth?: number
}

// 事件
export interface ContextMenuEmits {
  (e: 'update:visible', value: boolean): void
  (e: 'select', item: ContextMenuItem): void
  (e: 'close'): void
}
