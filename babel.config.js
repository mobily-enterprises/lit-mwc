module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      '@babel/env', {
        modules: false,
        exclude: []
      }
    ]
  ]
  const plugins = []

  return {
    presets,
    plugins
  }
}
