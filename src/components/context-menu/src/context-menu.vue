<script lang="ts" setup>
import type { ContextMenuEmits, ContextMenuItem, ContextMenuProps, OpenDirection } from './context-menu'
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, useTemplateRef, watch } from 'vue'
import contextSubmenu from './context-submenu.vue'

defineOptions({
  name: 'MContextMenu',
})
const props = withDefaults(defineProps<ContextMenuProps>(), {
  size: 'md',
  zIndex: 2000,
  minWidth: 200,
  maxWidth: 400,
})
const emits = defineEmits<ContextMenuEmits>()

const contextMenuRef = useTemplateRef('contextMenu')

const adjustedPosition = ref({ x: 0, y: 0 })
const openDirection = ref<OpenDirection>('right')

const menuMinWidth = computed(() => typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth)
const menuMaxWidth = computed(() => typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth)
const contextMenuStyle = computed(() => ({
  left: `${adjustedPosition.value.x}px`,
  top: `${adjustedPosition.value.y}px`,
  zIndex: props.zIndex,
  minWidth: menuMinWidth.value,
  maxWidth: menuMaxWidth.value,
  borderRadius: `var(--m-radius-${props.size})`,
  boxShadow: `var(--m-shadow-${props.size})`,
}))

// 为所有嵌套菜单项子项提供共享配置
provide('menuMinWidth', menuMinWidth.value)
provide('menuMaxWidth', menuMaxWidth.value)
provide('rootZIndex', props.zIndex)
provide('openDirection', openDirection.value)
provide('size', props.size)

function close() {
  emits('update:visible', false)
}
function handleSelect(item: ContextMenuItem) {
  emits('select', item)
  close()
}
// 计算菜单位置
async function calculatePosition() {
  await nextTick()
  if (!contextMenuRef.value) {
    return
  }
  const { innerWidth: vw, innerHeight: vh } = window
  const { offsetWidth: mw, offsetHeight: mh } = contextMenuRef.value
  let x = props.position.x
  let y = props.position.y

  if (x + mw > vw) {
    x = props.position.x - mw
    openDirection.value = 'left'
  }
  else {
    openDirection.value = 'right'
  }
  // 左边界兜底，防止向左展开时超出视口
  if (x < 0) {
    x = 0
  }
  // ── 垂直方向：底部不足则向上偏移，不低于视口顶部 ──
  if (y + mh > vh) {
    y = vh - mh
  }
  if (y < 0) {
    y = 0
  }
  adjustedPosition.value = { x, y }
}
// 任何菜单外的点击事件触发关闭菜单
function handleGlobalClick(e: MouseEvent) {
  if (!props.visible) {
    return
  }
  if (contextMenuRef.value && contextMenuRef.value.contains(e.target as Node)) {
    return
  }
  close()
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

watch(
  () => props.visible,
  (val) => {
    if (val) {
      calculatePosition()
    }
    else {
      emits('close')
    }
  },
)

onMounted(() => {
  document.addEventListener('mousedown', handleGlobalClick, true)
  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', close)
  window.addEventListener('scroll', close, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleGlobalClick, true)
  document.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', close)
  window.removeEventListener('scroll', close, true)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      ref="contextMenu"
      class="m-context-menu"
      :style="contextMenuStyle"
    >
      <context-submenu
        v-for="item in menus"
        :key="item.key ?? item.label"
        :item="item"
        :depth="0"
        @select="handleSelect"
      />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.m-context-menu {
  position: fixed;
  padding: var(--m-space-sm) 0;
  background-color: var(--m-color-bg);
  border: 1px solid var(--m-color-border);
}
</style>
