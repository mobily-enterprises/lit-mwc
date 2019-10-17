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
    input: './themes/material/material.js',
    output: {
      file: 'distr/theme-material.js', // IIFE ONE FILE
      format: 'iife'
    },
    plugins: [resolve({}), minify({})]
  },

  {
    input: './tpe.js',
    output: {
      file: 'distr/tpe-esm.js', // IIFE ONE FILE
      format: 'esm'
    },
    plugins: [resolve({})]
  },

  {
    input: './themes/material/material.js',
    output: {
      file: 'distr/theme-material-esm.js', // IIFE ONE FILE
      format: 'esm'
    },
    plugins: [resolve({})]
  }

/*
  {
    input: './themes/material/material.js',
    output: {
      file: 'distr/material.js', // IIFE ONE FILE
      format: 'iife'
    },
    plugins: [resolve({}), babel({}), minify({})]
  },

  //
  {
    input: allFiles,
    output: {
      dir: 'distr/amd', // AMD MINIFIED
      format: 'amd'
    },
    plugins: [resolve({}), babel({}), minify({})]
  },

  {
    input: allFiles,
    output: {
      dir: 'distr/amd-maxi', // AMD UN-MINIFIED
      format: 'amd'
    },
    plugins: [resolve({}), babel({})]
  },

  {
    input: './tpe.js',
    output: {
      file: 'distr/amd/tpe.js', // AMD ONE FILE
      format: 'amd'
    },
    plugins: [resolve({}), babel({}), minify({})]
  },

  // ESM

  {
    input: allFiles,
    output: {
      dir: 'distr/esm', // ESM MINIFIED
      format: 'esm',
      compact: true
    },
    plugins: [resolve({}), minify({})]
  },

  {
    input: allFiles,
    output: {
      dir: 'distr/esm-maxi', // ESM UN-MINIFIED
      format: 'esm',
      compact: true
    },
    plugins: [resolve({})]
  },

  {
    input: './tpe.js',
    output: {
      file: 'distr/esm/tpe.js', // ESM ONE FILE
      format: 'esm',
      compact: true
    },
    plugins: [resolve({}), minify({})]
  },

  // THEMES
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
    plugins: [resolve({}), minify({})]
  }
  */

]
