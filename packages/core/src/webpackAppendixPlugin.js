import { RawSource } from 'webpack-sources'

const findAppendixChunks = chunks => {
  const appendices = []

  for (const chunk of chunks) {
    for (const m of chunk.getModules()) {
      if (typeof m.id === 'string' && m.id.includes('__appendix.md')) {
        appendices.push({
          chunk,
          id: m.id,
          issuer: m.issuer.id,
          file: chunk.files[0],
          siblings: [],
        })
      }
    }
  }

  return appendices
}

const buildContent = chunks => {
  let content = ''

  for (const chunk of chunks) {
    for (const m of chunk.getModules()) {
      content = `${content}${m._source
        .source()
        .replace('module.exports = "', '')
        .replace(/"$/, '')}`
    }
  }

  return content
}

const addContentToChunk = chunks => target => {
  const siblings = []

  for (const chunk of chunks) {
    for (const m of chunk.getModules()) {
      if (
        typeof m.id === 'string' &&
        m.id.includes('.md') &&
        m.issuer &&
        m.issuer.id === target.issuer
      ) {
        siblings.push(chunk)
      }
    }
  }

  target.content = buildContent(siblings)

  return target
}

const writeChunk = compilation => ({ file, content }) => {
  const escaped = content.replace(/"/g, /\"/)

  compilation.assets[file] = new RawSource(
    compilation.assets[file]
      .source()
      .replace(`module.exports = "`, `module.exports = "${escaped}`)
      .replace(/eval(.*)/, `module.exports = "${escaped}"`)
  )
}

class AppendixPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('AppendixPlugin', compilation => {
      compilation.hooks.optimizeChunkAssets.tap('AppendixPlugin', chunks => {
        findAppendixChunks(chunks)
          .map(addContentToChunk(chunks))
          .forEach(writeChunk(compilation))
      })
    })
  }
}

module.exports = AppendixPlugin
