<template>
  <miu-button></miu-button>
  <div class="particles-box">
    <miu-particles></miu-particles>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
html,
body,
#app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.particles-box {
  height: 30%;
  width: 50%;
  background: pink;
}
</style>
