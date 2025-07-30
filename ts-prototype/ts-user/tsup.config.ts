import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['.generated/index.ts'],
  format: ['esm'],
  splitting: false,
  clean: true,
  dts: false,
  bundle: true,
  shims: false,
  target: 'esnext',
  external: ['golem:api', 'golem:rpc'],
  noExternal: ['rttist'],
  outExtension: () => ({ js: '.mjs' }),
});
