import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: false,
  clean: true,
  dts: true,
  shims: false,
  target: 'esnext',
  external: ['agentic-guest', 'golem:api', 'golem:rpc'],
  noExternal: ['rttist'],
  outExtension: () => ({ js: '.mjs' }),
});

