import path from 'path'
import webpack from 'webpack'

import webpackConfig from './webpack.config.js'

export default argv =>
  webpack(webpackConfig(argv), (err, stats) => {
    console.log('Stylegator built!')
  })
