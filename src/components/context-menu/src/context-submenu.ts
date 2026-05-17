import type { ContextMenuItem } from './context-menu'

export interface ContextSubmenuProps {
  item: ContextMenuItem
  depth?: number
}
export interface ContextSubmenuEmits {
  (e: 'select', item: ContextMenuItem): void
}
