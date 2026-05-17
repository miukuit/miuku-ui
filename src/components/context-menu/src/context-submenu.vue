<script lang="ts" setup>
import type { ContextMenuItem, ContextMenuProps, OpenDirection } from './context-menu'
import type { ContextSubmenuEmits, ContextSubmenuProps } from './context-submenu'
import { computed, inject, nextTick, ref, useTemplateRef } from 'vue'

const props = withDefaults(defineProps<ContextSubmenuProps>(), {
  depth: 0,
})
const emits = defineEmits<ContextSubmenuEmits>()

// 从父菜单注入共享上下文配置
const menuMinWidth = inject<ContextMenuProps['minWidth']>('menuMinWidth', 200)
const menuMaxWidth = inject<ContextMenuProps['maxWidth']>('menuMaxWidth', 400)
const rootZIndex = inject<ContextMenuProps['zIndex']>('rootZIndex', 2000)
const openDirection = inject<OpenDirection>('openDirection', 'left')
const size = inject<ContextMenuProps['size']>('size', 'md')

const contextSubmenuRef = useTemplateRef('contextSubmenu')
const contextSubmenuChildrenRef = useTemplateRef('contextSubmenuChildren')

const submenuVisible = ref(false)
const submenuPosition = ref({ x: 0, y: 0 })

const openTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const hasChildren = computed(() => !!props.item.children?.length)
const isDisabled = computed(() => props.item.disabled)
const isDivided = computed(() => props.item.divided)

const contextSubmenuStyle = computed(() => {
  return {
    minWidth: `${menuMinWidth}px`,
    maxWidth: `${menuMaxWidth}px`,
    zIndex: rootZIndex ? rootZIndex + props.depth : 0,
    fontSize: `var(--m-text-${size})`,
  }
})
const submenuIconStyle = computed(() => {
  return {
    width: `var(--m-size-icon-${size})`,
    height: `var(--m-size-icon-${size})`,
  }
})
const submenuChildrenStyle = computed(() => ({
  left: `${submenuPosition.value.x}px`,
  top: `${submenuPosition.value.y}px`,
  zIndex: rootZIndex ? rootZIndex + props.depth + 1 : 0,
  minWidth: menuMinWidth,
  maxWidth: menuMaxWidth,
  borderRadius: `var(--m-radius-${size})`,
  boxShadow: `var(--m-shadow-${size})`,
}))

// 处理子菜单鼠标进入事件
function handleChildrenMouseEnter() {
  clearTimers()
}
// 处理子菜单鼠标离开事件
function handleChildrenMouseLeave(event: MouseEvent) {
  clearTimers()
  if (contextSubmenuRef.value?.contains(event.relatedTarget as Node)) {
    return
  }
  return
  closeTimer.value = setTimeout(() => {
    submenuVisible.value = false
  }, 300)
}
// 计算子菜单位置
async function calculateSubmenuPosition() {
  if (!contextSubmenuRef.value) {
    return
  }
  // 等待子菜单 DOM 渲染完毕后再量取真实尺寸
  await nextTick()

  const rect = contextSubmenuRef.value.getBoundingClientRect()
  const vw = window.innerWidth
  const vh = window.innerHeight

  // 优先使用实际子菜单宽度，回退到配置的最小宽度
  const smW = contextSubmenuChildrenRef.value?.offsetWidth ?? menuMinWidth ?? 0
  // 优先使用实际子菜单高度，回退到视口高度（防止为 0 时误判）
  const smH = contextSubmenuChildrenRef.value?.offsetHeight ?? vh
  let x: number
  let y: number

  // ── 水平：继承根菜单方向，边界时翻转 ──
  if (openDirection === 'right') {
    x = rect.right
    if (x + smW > vw) {
      x = rect.left - smW
    }
  }
  else {
    x = rect.left - smW
    if (x < 0) {
      x = rect.right
    }
  }

  // ── 垂直：顶部对齐，底部溢出时上移，顶部溢出时下移 ──
  y = rect.top
  if (y + smH > vh && y >= smH) {
    y = rect.bottom - smH
  }
  else if (y + smH > vh) {
    y = 0
  }
  if (y < 0) {
    y = 0
  }

  submenuPosition.value = { x, y }
}
// 清除定时器
function clearTimers() {
  if (openTimer.value) {
    clearTimeout(openTimer.value)
    openTimer.value = null
  }
  if (closeTimer.value) {
    clearTimeout(closeTimer.value)
    closeTimer.value = null
  }
}

function isInsideChildren(event: MouseEvent): boolean {
  const children = contextSubmenuChildrenRef.value
  if (!children) {
    return false
  }
  return children.contains(event.relatedTarget as Node)
}
async function handleMouseEnter() {
  if (isDisabled.value) {
    return
  }
  clearTimers()
  if (hasChildren.value) {
    openTimer.value = setTimeout(async () => {
      submenuVisible.value = true
      // 先让子菜单渲染，再量取真实尺寸计算位置
      await calculateSubmenuPosition()
    }, 300)
  }
}
// 处理鼠标离开事件
function handleMouseLeave(event: MouseEvent) {
  if (isDisabled.value) {
    return
  }
  clearTimers()
  if (hasChildren.value) {
    if (isInsideChildren(event)) {
      return
    }
    closeTimer.value = setTimeout(() => {
      submenuVisible.value = false
    }, 300)
  }
}

async function handleClick() {
  if (isDisabled.value || hasChildren.value) {
    return
  }
  if (props.item.onClick) {
    await props.item.onClick(props.item)
  }
  emits('select', props.item)
}
function handleChildSelect(item: ContextMenuItem) {
  emits('select', item)
}
</script>

<template>
  <div v-if="isDivided" class="m-context-submenu__divider" />
  <div
    ref="contextSubmenu"
    class="m-flex-center-x m-context-submenu"
    :class="[
      item.customClass,
      {
        'is-disabled': isDisabled,
        'is-divided': isDivided,
      },
    ]"
    :style="contextSubmenuStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <!-- 图标插槽 -->
    <div
      class="m-context-submenu__icon"
      :style="submenuIconStyle"
    >
      <!--  -->
    </div>
    <!-- 文本插槽 -->
    <div class="m-flex-w">
      <span>{{ item.label }}</span>
    </div>
    <!-- 快捷键 -->
    <span v-if="item.shortcut && !hasChildren" class="m-context-submenu__shortcut">{{ item.shortcut }}</span>
    <!-- 子菜单箭头 -->
    <span v-if="hasChildren" class="m-icon m-icon--arrow-right m-context-submenu__arrow" />

    <!-- 子菜单 传送到主体以进行正确的 z-index 堆叠 -->
    <Teleport v-if="hasChildren && submenuVisible" to="body">
      <div
        ref="contextSubmenuChildren"
        class="m-context-submenu__children"
        :style="submenuChildrenStyle"
        @mouseenter="handleChildrenMouseEnter"
        @mouseleave="handleChildrenMouseLeave"
      >
        <context-submenu
          v-for="child in item.children"
          :key="child.key ?? child.label"
          :item="child"
          :depth="depth + 1"
          @select="handleChildSelect"
        />
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.m-context-submenu {
  padding: 0 var(--m-space-md);
  height: 2.25rem;
  &__divider {
    border-top: 1px solid var(--m-color-border);
  }
  &.is-disabled {
    color: var(--m-color-text-disabled);
    cursor: not-allowed;
  }
  &__icon {
    margin-right: var(--m-space-sm);
  }
  &__shortcut {
    font-size: var(--m-text-xs);
    color: var(--m-color-text-secondary);
  }
  &__arrow {
    background-color: var(--m-color-text-secondary);
  }
  &:hover:not(.is-disabled) {
    background-color: rgba(var(--m-color-primary-rgb), 0.05);
    color: var(--m-color-primary);
    cursor: pointer;
  }

  &__children {
    position: fixed;
    padding: var(--m-space-sm) 0;
    background-color: var(--m-color-bg);
    border: 1px solid var(--m-color-border);
  }
}
</style>
