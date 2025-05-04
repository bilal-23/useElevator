const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const url = require('@rollup/plugin-url');
const { terser } = require('rollup-plugin-terser');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const { dts } = require('rollup-plugin-dts');
const pkg = require('./package.json');

module.exports = [
  {
    input: 'lib/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx'],
      }),
      url({
        include: ['**/*.mp3'],
        limit: 0, // Copy all audio files as separate assets
        fileName: '[name][extname]',
      }),
      terser(),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'lib/index.ts',
    output: {
      file: pkg.types,
      format: 'es',
    },
    plugins: [dts()],
  },
]; 