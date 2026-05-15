<script lang="ts" setup>
import { MCountTo } from '@miuku-ui'
</script>

<template>
  <div class="count-to-test">
    <MCountTo :end-val="100.123" :precision="2" :mutant="true" />
  </div>
</template>

<style scoped>
.count-to-test {
  font-size: 40px;
}
</style>
