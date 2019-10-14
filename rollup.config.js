import resolve from 'rollup-plugin-node-resolve'
import allFiles from './rollup/allFiles.js'
import babel from 'rollup-plugin-babel'
// import minify from 'rollup-plugin-babel-minify'

module.exports = [
  {
    input: allFiles,
    output: {
      dir: 'distr/amd',
      format: 'amd'
    },
    plugins: [resolve({}), babel({})]
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

/*
  {
    input: allFiles,
    output: {
      dir: 'distr/umd',
      format: 'umd'
    },
    plugins: [resolve({})]
  },
*/

  {
    input: 'themes/material/material.js',
    output: {
      dir: 'distr/amd/themes/material',
      format: 'amd',
      compact: true
    },
    plugins: [resolve({}), babel({})]
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
