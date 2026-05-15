<script lang="ts" setup>
import type { ContextMenuEmits, ContextMenuItem, ContextMenuProps } from './context-menu'
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, useTemplateRef, watch } from 'vue'
import contextMenuItem from './context-menu-item.vue'

defineOptions({
  name: 'MContextMenu',
})

const props = withDefaults(defineProps<ContextMenuProps>(), {
  zIndex: 2000,
  minWidth: 150,
  maxWidth: 300,
  submenuOpenDelay: 200,
  submenuCloseDelay: 300,
})
const emits = defineEmits<ContextMenuEmits>()

const menuRef = useTemplateRef('contextMenuRef')
const adjustedPosition = ref({ x: 0, y: 0 })

// 为所有嵌套菜单项子项提供共享配置
provide('submenuOpenDelay', computed(() => props.submenuOpenDelay))
provide('submenuCloseDelay', computed(() => props.submenuCloseDelay))
provide('menuMinWidth', computed(() => props.minWidth))
provide('menuMaxWidth', computed(() => props.maxWidth))
provide('rootZIndex', computed(() => props.zIndex))

function close() {
  emits('update:visible', false)
}
function handleSelect(item: ContextMenuItem) {
  emits('select', item)
  close()
}

// 计算位置
async function calcPosition() {
  await nextTick()
  if (!menuRef.value) {
    return
  }
  const { innerWidth: vw, innerHeight: vh } = window
  const { offsetWidth: mw, offsetHeight: mh } = menuRef.value
  const offsetX = props.offset?.x ?? 0
  const offsetY = props.offset?.y ?? 0

  let x = props.position.x + offsetX
  let y = props.position.y + offsetY
  // Prevent overflow right
  if (x + mw > vw) {
    x = vw - mw
  }
  // Prevent overflow bottom
  if (y + mh > vh) {
    y = vh - mh
  }

  adjustedPosition.value = { x, y }
}

// ESC 键触发关闭菜单
function handleKeydown(e: KeyboardEvent) {
  if (!props.visible) {
    return
  }
  if (e.key === 'Escape') {
    close()
  }
}
// 任何菜单外的点击事件触发关闭菜单
function handleGlobalClick(e: MouseEvent) {
  if (!props.visible) {
    return
  }
  if (menuRef.value && menuRef.value.contains(e.target as Node)) {
    return
  }
  close()
}
// 任何菜单外的右键事件触发关闭菜单
function handleContextMenu(e: MouseEvent) {
  if (!props.visible) {
    return
  }
  if (menuRef.value && menuRef.value.contains(e.target as Node)) {
    return
  }
  close()
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      calcPosition()
      emits('open', props.position)
    }
    else {
      emits('close')
    }
  },
)
watch(
  () => props.position,
  () => {
    if (props.visible) {
      calcPosition()
    }
  },
)

onMounted(() => {
  document.addEventListener('mousedown', handleGlobalClick, true)
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('contextmenu', handleContextMenu, true)
  window.addEventListener('resize', close)
  window.addEventListener('scroll', close, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleGlobalClick, true)
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('contextmenu', handleContextMenu, true)
  window.removeEventListener('resize', close)
  window.removeEventListener('scroll', close, true)
})
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="visible"
        ref="contextMenuRef"
        class="m-context-menu"
        :style="{
          left: `${adjustedPosition.x}px`,
          top: `${adjustedPosition.y}px`,
          minWidth: `${minWidth}px`,
          maxWidth: `${maxWidth}px`,
          zIndex,
        }"
        role="menu"
        aria-label="Context menu"
      >
        <contextMenuItem
          v-for="item in menus"
          :key="item.key ?? item.label"
          :item="item"
          :depth="0"
          @select="handleSelect"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.m-context-menu {
  // TODO 编写样式
}
</style>
