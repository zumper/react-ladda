import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import camelCase from 'lodash.camelcase'
import kebabCase from 'lodash.kebabcase'
import upperFirst from 'lodash.upperfirst'

import pkg from './package.json'

const input = 'src/index.js'
const globalName = upperFirst(camelCase(pkg.name))
const fileName = kebabCase(pkg.name)

const external = [
  ...Object.keys(pkg.dependencies || {}).filter(
    (key) => key !== '@babel/runtime'
  ),
  ...Object.keys(pkg.peerDependencies || {}),
]
const globals = {
  react: 'React',
  'prop-types': 'PropTypes',
}

export default [
  // UMD Development
  {
    input,
    output: {
      file: `dist/${fileName}.js`,
      format: 'umd',
      name: globalName,
      indent: false,
      exports: 'named',
      globals,
    },
    external,
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
      }),
      babel(),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },

  // UMD Production
  {
    input,
    output: {
      file: `dist/${fileName}.min.js`,
      format: 'umd',
      name: globalName,
      indent: false,
      exports: 'named',
      globals,
    },
    external,
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
      }),
      babel(),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
]
