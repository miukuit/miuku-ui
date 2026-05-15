<script lang="ts" setup>
import { MWaveWrapper } from '@miuku-ui'
</script>

<template>
  <div class="wave-wrapper-test">
    <MWaveWrapper :percent="18" />
  </div>
</template>

<style scoped>
.wave-wrapper-test {
  height: 100px;
  width: 50px;
  background: #000;
}
</style>
