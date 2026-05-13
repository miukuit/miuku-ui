<script lang="ts" setup>
import { MCountTo } from '@miuku-ui'
</script>

<template>
  <div class="text-40">
    <MCountTo :end-val="100.123" :precision="2" :mutant="true" />
  </div>
</template>
