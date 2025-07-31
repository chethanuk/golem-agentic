import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { defineConfig } from 'rollup';

export default defineConfig({
    input: '.generated/index.ts',
    output: {
        file: 'dist/index.mjs',
        format: 'esm',
        inlineDynamicImports: true,
        sourcemap: false,
    },
    external: (id) =>
        id === '@afsalthaj/golem-ts-sdk' ||
        id.startsWith('golem:api') ||
        id.startsWith('golem:rpc'),
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            include: ['**/*.ts']
        }),
        nodeResolve({
            extensions: ['.ts', '.js'],
        }),
        json(),
    ],
});
