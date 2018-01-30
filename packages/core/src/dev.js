import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import webpackConfig from './webpack.config'

export default argv => {
  const { host, port } = argv
  const serverConfig = { host, port, hot: true }
  const compilerConfig = webpackConfig(argv)
  WebpackDevServer.addDevServerEntrypoints(compilerConfig, serverConfig)
  const compiler = webpack(compilerConfig)
  const server = new WebpackDevServer(compiler, serverConfig)
  server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080')
  })
}
