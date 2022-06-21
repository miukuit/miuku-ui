<template>
  <miu-button>按钮</miu-button>
  <miu-button type="success">按钮</miu-button>
  <miu-button type="success" size="large">按钮</miu-button>
  <miu-button type="success" size="large" round>按钮</miu-button>
  <miu-button type="danger">按钮</miu-button>
  <miu-button type="danger" size="large">按钮</miu-button>
  <miu-button type="danger" size="large" round>按钮</miu-button>
  <miu-button type="warning">按钮</miu-button>
  <miu-button type="warning" size="large">按钮</miu-button>
  <miu-button type="warning" size="large" round>按钮</miu-button>
  <miu-button type="warning" bg-color="pink" text-color="#1bb556" round>按钮</miu-button>
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
