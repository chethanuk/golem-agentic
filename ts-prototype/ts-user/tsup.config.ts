import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: false,
  clean: true,
  dts: false,
  bundle: true,
  shims: false,
  target: 'esnext',
  external: [],
  outExtension: () => ({ js: '.mjs' }),
})
