import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'unplugin-dts/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      bundleTypes: true,
      insertTypesEntry: true,
      tsconfigPath: 'tsconfig.app.json',
      exclude: ['playground'],
    }),
  ],
  resolve: {
    alias: {
      '@miuku-ui': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MiukuUI',
      formats: ['es', 'cjs', 'umd'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
