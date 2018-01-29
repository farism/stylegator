const path = require('path')
const { RawSource } = require('webpack-sources')
const ModuleFileHelpers = require('webpack/lib/ModuleFilenameHelpers')

function AppendixPlugin(options = {}) {
  this.options = Object.assign({}, options)
}

AppendixPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', (compilation, params) => {
    compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
      const sorted = chunks.sort((chunk1, chunk2) => {
        const a = chunk1.mapModules(m => m.index)[0]
        const b = chunk2.mapModules(m => m.index)[0]

        return a < b ? -1 : a > b ? 1 : 0
      })

      const files = chunks.reduce(
        (acc, chunk) => acc.concat(chunk.files || []),
        []
      )

      const appendix = sorted.reduce((acc, chunk) => {
        let contents = ''

        chunk.forEachModule(m => {
          if (m.rawRequest && m.rawRequest.endsWith('.md')) {
            contents += m
              .source()
              .source()
              .replace('module.exports = "', '')
              .replace(/"$/, '')
          }
        })

        return acc + contents
      }, '')

      sorted.forEach(chunk => {
        chunk.forEachModule(({ rawRequest }) => {
          if (rawRequest && rawRequest.endsWith('__appendix.md')) {
            const file = chunk.files[0]
            const source = compilation.assets[file].source()
            const newSource = source.replace(
              /module\.exports = ".*?"/,
              `module.exports = "${appendix}"`
            )
            compilation.assets[file] = new RawSource(newSource)
          }
        })
      })

      callback()
    })
  })
}

module.exports = AppendixPlugin
