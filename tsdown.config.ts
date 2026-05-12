import { defineConfig } from 'tsdown'

export default defineConfig({
  platform: 'neutral',
  exports: true,
  fromVite: true,
  clean: true,
  // format: ['esm', 'cjs', 'umd'],
  dts: { vue: true },
  // outputOptions: {
  //   name: 'MiukuUI',
  //   exports: 'named',
  //   globals: {
  //     vue: 'Vue',
  //   },
  // },
})
