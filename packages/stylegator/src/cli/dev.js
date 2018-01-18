const path = require('path')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const userOptions = require(path.resolve('stylegator.config'))
const webpackConfig = require('../webpack.config')

module.exports = () =>
  new Promise((resolve, reject) => {
    const compiler = Webpack(webpackConfig(userOptions))
    const devServerOptions = Object.assign({}, webpackConfig.devServer)
    const server = new WebpackDevServer(compiler, devServerOptions)
    server.listen(8080, '127.0.0.1', () => {
      console.log('Starting server on http://localhost:8080')
    })
  })
