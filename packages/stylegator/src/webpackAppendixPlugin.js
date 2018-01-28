const path = require('path')

const NODE_MODULES = 'node_modules'
const APPENDIX_ID = '__appendix.md'

function AppendixPlugin(opts) {
  this.opts = Object.assign({}, opts || {})
}

let i = 0

AppendixPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', (compilation, compileCallback) => {
    const appendix = compilation.modules
      .filter(module => {
        return (
          module.id &&
          !module.id.includes(NODE_MODULES) &&
          !module.id.includes(APPENDIX_ID) &&
          path.extname(module.id) === '.md'
        )
      })
      .sort((a, b) => {
        if (a.index < b.index) {
          return -1
        } else if (a.index > b.index) {
          return 1
        } else {
          return 0
        }
      })
      .map(module => {
        return module._source._value
          .replace(/module\.exports = "/, '')
          .replace(/"(\W*)?$/, '')
      })
      .reduce((acc, val) => `${acc}${val}`, '')

    Object.values(compilation.assets).forEach(asset => {
      const child = asset.children && asset.children[0]
      if (child && child._value.includes(APPENDIX_ID)) {
        child._value = child._value.replace(
          /module\.exports = "(.*)?"/,
          `module.exports = "${appendix}"`
        )
      }
    })

    compileCallback()
  })
}

module.exports = AppendixPlugin
