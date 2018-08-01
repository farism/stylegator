//   const serverConfig = {
//     host,
//     port,
//     hot: true,
//     contentBase: `${srcDir}/${contentBase}`,
//   }

import webpackServe from 'webpack-serve'

import webpackConfig from './webpack.config'

export default argv => {
  const { host, port, srcDir, contentBase } = argv

  webpackServe({}, { config: webpackConfig(argv) }).then(server => {
    server.on('listening', ({ server, options }) => {
      console.log(
        `Server started on  ${host === '0.0.0.0' ? 'localhost' : port}:${port}`
      )
    })
  })
}
