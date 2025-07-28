import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: false,
  clean: true,
  dts: false,
  shims: false,
  target: 'esnext',
  external: ['agentic-guest', 'golem:api'],
  noExternal: ['rttist'],
  outExtension: () => ({ js: '.mjs' }),
});

