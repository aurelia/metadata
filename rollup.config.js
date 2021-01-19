// @ts-check
import typescript from '@rollup/plugin-typescript';

const name = require('./package.json').name;

/**
 * @type {import('rollup').RollupOptions[]}
 */
const rollupOptions = [
  {
    input: 'src/index.ts',
    external: [
      'aurelia-pal'
    ],
    output: [
      {
        file: `dist/es2015/${name}.js`,
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
    external: [
      'aurelia-pal'
    ],
    output: [
      {
        file: `dist/native-modules/${name}.js`,
        format: 'es',
        sourcemap: true,
      },
      {
        file: `dist/amd/${name}.js`,
        format: 'amd',
        name: 'aurelia-metadata',
        sourcemap: true,
      },
      {
        file: `dist/commonjs/${name}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `dist/system/${name}.js`,
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
