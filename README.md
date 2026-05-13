# miuku-ui

## 使用指南

### 按需引入

```
<script setup lang="ts">
import { MCountTo } from 'miuku-ui'
</script>

<template>
  <MCountTo :end-val="88.23533" :precision="2" :duration="2000" mutant />
</template>
```

### 全量引入

```ts
import MiukuUI from 'miuku-ui'
import { createApp } from 'vue'
import App from './App.vue'
import 'miuku-ui/style' // 引入全局样式

const app = createApp(App)

app.use(MiukuUI)
app.mount('#app')
```
