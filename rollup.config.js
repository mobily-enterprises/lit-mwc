import resolve from 'rollup-plugin-node-resolve'
import allFiles from './rollup/allFiles.js'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

module.exports = [
  {
    input: allFiles,
    output: {
      dir: 'distr/amd',
      format: 'amd'
    },
    plugins: [resolve({}), babel({}), minify({})]
  },
  {
    input: './tpe.js',
    output: {
      file: 'distr/amd/tpe.js',
      format: 'amd'
    },
    plugins: [resolve({}), babel({}), minify({})]
  },

  {
    input: allFiles,
    output: {
      dir: 'distr/esm',
      format: 'esm',
      compact: true
    },
    plugins: [resolve({})]
  },

  {
    input: './tpe.js',
    output: {
      file: 'distr/esm/tpe.js',
      format: 'esm',
      compact: true
    },
    plugins: [resolve({})]
  },

  {
    input: 'themes/material/material.js',
    output: {
      dir: 'distr/amd/themes/material',
      format: 'amd',
      compact: true
    },
    plugins: [resolve({}), babel({}), minify({})]
  },
  {
    input: 'themes/material/material.js',
    output: {
      dir: 'distr/esm/themes/material',
      format: 'esm',
      compact: true
    },
    plugins: [resolve({})]
  }

]
