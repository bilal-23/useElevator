const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const url = require('@rollup/plugin-url');
const { dts } = require('rollup-plugin-dts');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const { terser } = require('rollup-plugin-terser');
const packageJson = require('./package.json');

/**
 * This configuration creates three output formats:
 * 1. CommonJS (cjs) for Node.js compatibility
 * 2. ES modules (esm) for modern bundlers
 * 3. TypeScript declarations
 * 
 * It properly marks React as an external dependency
 */
module.exports = [
  // JavaScript builds
  {
    input: 'lib/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      // Extract peer dependencies
      peerDepsExternal(),
      // Resolve node modules
      resolve(),
      // Convert CommonJS modules to ES6
      commonjs(),
      // Process TypeScript files
      typescript({ 
        tsconfig: './tsconfig.build.json',
        exclude: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx'] 
      }),
      // Handle asset files - no longer need specific audio handling
      url(),
      // Minify output
      terser(),
    ],
    // Explicitly mark React as external
    external: ['react', 'react-dom']
  },
  // TypeScript declarations
  {
    input: 'lib/index.ts',
    output: [{ file: packageJson.types, format: 'es' }],
    plugins: [dts()],
    external: ['react', 'react-dom']
  },
]; 