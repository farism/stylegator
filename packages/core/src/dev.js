// import path from 'path'
// import webpack from 'webpack'
// import WebpackDevServer from 'webpack-dev-server'

// import webpackConfig from './webpack.config'

// export default argv => {
//   const { host, port, srcDir, contentBase } = argv
//   const serverConfig = {
//     host,
//     port,
//     hot: true,
//     contentBase: `${srcDir}/${contentBase}`,
//   }
//   const compilerConfig = webpackConfig(argv)
//   WebpackDevServer.addDevServerEntrypoints(compilerConfig, serverConfig)
//   const compiler = webpack(compilerConfig)
//   const server = new WebpackDevServer(compiler, serverConfig)

//   server.listen(port, host, () => {
//     console.log(
//       `Starting server on http://${
//         host === '0.0.0.0' ? 'localhost' : host
//       }:${port}`
//     )
//   })
// }

import webpackServe from 'webpack-serve'

import webpackConfig from './webpack.config'

export default argv => {
  webpackServe({}, { config: webpackConfig(argv) }).then(server => {
    server.on('listening', ({ server, options }) => {
      console.log('Stylegator')
    })
  })
}
