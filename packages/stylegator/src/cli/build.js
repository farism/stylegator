const path = require('path')
const webpack = require('webpack')

const userOptions = require(path.resolve('stylegator.config'))
const webpackConfig = require('../webpack.config.js')

const build = () =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig(userOptions), (err, stats) => {
      resolve('Stylegator built!')
    })
  })

module.exports = build
