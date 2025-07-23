import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: false,
  clean: true,
  dts: {
    resolve: true
  },
  shims: false,
  target: 'esnext',
  external: ['agentic-guest'],
  outExtension: () => ({ js: '.mjs' }),
});

