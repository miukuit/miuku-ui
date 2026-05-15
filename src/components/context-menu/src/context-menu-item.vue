<script lang="ts" setup>
import type { Component, VNode } from 'vue'
import type { ContextMenuItem, ContextMenuItemProps } from './context-menu'
import { computed, h, inject, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(defineProps<ContextMenuItemProps>(), {
  depth: 0,
})
const emits = defineEmits<{
  (e: 'select', item: ContextMenuItem): void
}>()
// 从父菜单注入共享上下文
const submenuOpenDelay = inject<number>('submenuOpenDelay', 200)
const submenuCloseDelay = inject<number>('submenuCloseDelay', 300)
const menuMinWidth = inject<number>('menuMinWidth', 150)
const menuMaxWidth = inject<number>('menuMaxWidth', 300)
const rootZIndex = inject<number>('rootZIndex', 2000)

const itemRef = ref<HTMLElement | null>(null)
const submenuVisible = ref(false)
const submenuPosition = ref({ x: 0, y: 0 })
const openTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const hasChildren = computed(() => !!props.item.children?.length)
const isDisabled = computed(() => props.item.disabled)

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
function calcSubmenuPosition() {
  if (!itemRef.value) {
    return
  }
  const rect = itemRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  // Try right side first
  let x = rect.right
  let y = rect.top
  // If overflows right, show on left
  if (x + menuMinWidth > viewportWidth) {
    x = rect.left - menuMinWidth
  }
  // Clamp y
  if (y + 200 > viewportHeight) {
    y = Math.max(0, viewportHeight - 200)
  }
  submenuPosition.value = { x, y }
}
function handleMouseEnter() {
  if (isDisabled.value) {
    return
  }
  clearTimers()
  if (hasChildren.value) {
    openTimer.value = setTimeout(() => {
      calcSubmenuPosition()
      submenuVisible.value = true
    }, submenuOpenDelay)
  }
}

function handleMouseLeave() {
  if (isDisabled.value) {
    return
  }
  clearTimers()
  if (hasChildren.value) {
    closeTimer.value = setTimeout(() => {
      submenuVisible.value = false
    }, submenuCloseDelay)
  }
}
function handleSubmenuMouseEnter() {
  clearTimers()
}

function handleSubmenuMouseLeave() {
  clearTimers()
  closeTimer.value = setTimeout(() => {
    submenuVisible.value = false
  }, submenuCloseDelay)
}

async function handleClick() {
  if (isDisabled.value || hasChildren.value)
    return
  if (props.item.onClick) {
    await props.item.onClick(props.item)
  }
  emits('select', props.item)
}

function handleChildSelect(item: ContextMenuItem) {
  emits('select', item)
}

// Render icon — supports string (emoji/text), VNode, or Component
function renderIcon(icon: string | VNode | Component | undefined) {
  if (!icon) {
    return null
  }
  if (typeof icon === 'string') {
    return h('span', null, icon)
  }
  return h('span', null, [h(icon as any)])
}

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<template>
  <div
    ref="itemRef"
    :aria-disabled="isDisabled"
    :aria-haspopup="hasChildren ? 'menu' : undefined"
    :aria-expanded="hasChildren ? submenuVisible : undefined"
    role="menuitem"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <!-- 图标插槽 -->
    <component :is="() => renderIcon(item.icon)" v-if="item.icon" />
    <!-- 文本 -->
    <span>{{ item.label }}</span>
    <!-- 快捷键 -->
    <span v-if="item.shortcut && !hasChildren">{{ item.shortcut }}</span>
    <!-- 子菜单箭头 -->
    <span v-if="hasChildren">
      >
    </span>
    <!-- 子菜单 传送到主体以进行正确的 z-index 堆叠 -->
    <Teleport v-if="hasChildren && submenuVisible" to="body">
      <div
        :style="{
          left: `${submenuPosition.x}px`,
          top: `${submenuPosition.y}px`,
          minWidth: `${menuMinWidth}px`,
          maxWidth: `${menuMaxWidth}px`,
          zIndex: rootZIndex + depth + 1,
        }"
        role="menu"
        @mouseenter="handleSubmenuMouseEnter"
        @mouseleave="handleSubmenuMouseLeave"
      >
        <ContextMenuItem
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
