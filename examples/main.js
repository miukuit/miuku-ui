import { createApp } from 'vue'
import App from './App.vue'

import miukuUI from '../packages'

const app = createApp(App)
app
  .use(miukuUI)
  .mount('#app')
