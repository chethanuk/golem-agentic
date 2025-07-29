import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', '.metadata/bundler.ts'],
  format: ['esm'],
  splitting: false,
  clean: true,
  dts: false,
  bundle: true,
  shims: false,
  target: 'esnext',
  external: ['agentic-guest', 'golem:api', 'golem:rpc'],
  noExternal: ['rttist'],
  outExtension: () => ({ js: '.mjs' }),
})
