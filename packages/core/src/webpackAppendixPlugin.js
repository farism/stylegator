import path from 'path'
import { RawSource } from 'webpack-sources'
import ModuleFileHelpers from 'webpack/lib/ModuleFilenameHelpers'

const findAppendixChunks = chunks =>
  chunks.reduce((acc, chunk) => {
    chunk.forEachModule(m => {
      if (typeof m.id === 'string' && m.id.includes('__appendix.md')) {
        acc.push({
          chunk,
          id: m.id,
          issuer: m.issuer.id,
          file: chunk.files[0],
          siblings: [],
        })
      }
    })

    return acc
  }, [])

const buildContent = chunks =>
  chunks.reduce(
    (acc, chunk) =>
      `${acc}${chunk
        .mapModules(m => m.source().source())
        .join('')
        .replace('module.exports = "', '')
        .replace(/"$/, '')}`,
    ''
  )

const addContent = chunks => appendixChunk => {
  const siblings = chunks
    .reduce((acc, chunk) => {
      chunk.forEachModule(m => {
        if (
          typeof m.id === 'string' &&
          m.id.includes('.md') &&
          m.issuer &&
          m.issuer.id === appendixChunk.issuer
        ) {
          acc.push(chunk)
        }
      })

      return acc
    }, [])
    .sort(sortChunks)

  appendixChunk.content = buildContent(siblings)

  return appendixChunk
}

const sortChunks = (chunk1, chunk2) => {
  if (chunk1.mapModules && chunk2.mapModules) {
    const a = chunk1.mapModules(m => m.index)[0]
    const b = chunk2.mapModules(m => m.index)[0]
    return a < b ? -1 : a > b ? 1 : 0
  }
}

const writeChunk = compilation => ({ file, content }) => {
  compilation.assets[file] = new RawSource(
    compilation.assets[file]
      .source()
      .replace(/module\.exports = "(.*)?"/, `module.exports = "$1${content}"`)
  )
}

function AppendixPlugin() {}

AppendixPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', (compilation, params) => {
    compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
      findAppendixChunks(chunks)
        .map(addContent(chunks))
        .forEach(writeChunk(compilation))

      callback()
    })
  })
}

export default AppendixPlugin
