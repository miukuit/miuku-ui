<script lang="ts" setup>
import type { ContextMenuProps } from './context-menu'

defineOptions({
  name: 'MContextMenu',
})

withDefaults(defineProps<ContextMenuProps>(), {
  // TODO
})
</script>

<template>
  <div>
    context menu
  </div>
</template>
