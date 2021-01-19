// @ts-check
import typescript from '@rollup/plugin-typescript';

/**
 * @type {import('rollup').RollupOptions[]}
 */
const rollupOptions = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/es2015/index.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        removeComments: true,
        sourceMap: true,
      })
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/native-modules/index.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/amd/index.js',
        format: 'amd',
        name: 'aurelia-metadata',
        sourcemap: true,
      },
      {
        file: 'dist/commonjs/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/system/index.js',
        format: 'system',
        sourcemap: true,
      }
    ],
    plugins: [
      typescript({
        target: 'es5',
        removeComments: true,
        sourceMap: true,
      })
    ]
  }
];

export default rollupOptions;
