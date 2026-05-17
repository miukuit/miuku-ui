<script lang="ts" setup>
import type { ContextMenuItem, ContextMenuPosition } from '@miuku-ui'
import { MContextMenu } from '@miuku-ui'
import { h, ref } from 'vue'

const menuPosition = ref<ContextMenuPosition>({
  x: 0,
  y: 0,
})
const selectMenu = ref<ContextMenuItem>()

const contextMenuVisible = ref(false)

const menuList: ContextMenuItem[] = [
  {
    label: '复制',
    key: 'copy',
    shortcut: 'Ctrl+C',
    icon: h('i', { class: 'icon-copy' }),
  },
  {
    label: '粘贴',
    key: 'paste',
    disabled: true,
    shortcut: 'Ctrl+V',
    icon: h('i', { class: 'icon-paste' }),
  },
  {
    label: '插入字段',
    divided: true,
    children: [
      {
        label: '插入文本',
        key: 'insert-text',
      },
      {
        label: '插入图片',
        key: 'insert-image',
      },
    ],
  },
  {
    label: '权限设置',
    divided: true,
    children: [
      {
        label: '全员权限',
        children: [
          {
            label: '读取',
            key: 'read',
          },
          {
            label: '写入',
            key: 'write',
          },
        ],
      },
      {
        label: '自定义权限',
        key: 'custom-permission',
      },
    ],
  },
]

function contextMenuSelectEvent(item: ContextMenuItem) {
  selectMenu.value = item
}
function showContextMenu(e: MouseEvent) {
  e.preventDefault()
  menuPosition.value = { x: e.clientX, y: e.clientY }
  contextMenuVisible.value = true
}
</script>

<template>
  <div
    class="context-menu-test"
    @contextmenu="showContextMenu"
  >
    {{ selectMenu }}
  </div>
  <MContextMenu
    v-model:visible="contextMenuVisible"
    :position="menuPosition"
    :menus="menuList"
    @select="contextMenuSelectEvent"
  />
</template>

<style scoped>
.context-menu-test {
  height: 300px;
  width: 100%;
}
</style>
