<script lang="ts" setup>
import type { ContextMenuProps } from './context-menu'
// import contextMenuItem from './context-menu-item.vue'

defineOptions({
  name: 'MContextMenu',
})

withDefaults(defineProps<ContextMenuProps>(), {
  zIndex: 2000,
  minWidth: 150,
  maxWidth: 300,
  submenuOpenDelay: 200,
  submenuCloseDelay: 300,
})
</script>

<template>
  <div>
    context menu
  </div>
</template>
