import resolve from 'rollup-plugin-node-resolve'
// import allFiles from './rollup/allFiles.js'
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

module.exports = [

  // IIFE
  {
    input: './tpe-babel.js',
    output: {
      file: 'distr/tpe.js', // IIFE ONE FILE
      format: 'iife'
    },
    // plugins: [resolve({}), babel({exclude: [/\/core-js\//]}), minify({})]
    plugins: [resolve({}), babel({ runtimeHelpers: true }), minify({})]
  },

  {
    input: './tpe.js',
    output: {
      file: 'distr/tpe-esm.js', // IIFE ONE FILE
      format: 'esm'
    },
    plugins: [resolve({})]
  }

]
