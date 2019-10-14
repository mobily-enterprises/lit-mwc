module.exports = function (api) {
  api.cache(true)

  const presets = [
    [
      '@babel/env', {
        modules: false,
        exclude: [],
        targets: {
          ie: '9'
        }
      }
    ]
  ]
  const plugins = []

  return {
    presets,
    plugins
  }
}
