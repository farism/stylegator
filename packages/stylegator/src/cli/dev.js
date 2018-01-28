const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const userOptions = require(path.resolve('stylegator.config'))
const webpackConfig = require('../webpack.config')

const command = 'dev'

const description = 'starts Stylegator in dev mode'

const handler = argv => {
  const config = webpackConfig(userOptions)
  const devServer = { host: 'localhost', port: 8080, hot: true }
  WebpackDevServer.addDevServerEntrypoints(config, devServer)
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, devServer)
  server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080')
  })
}

module.exports = {
  command,
  description,
  handler,
}
