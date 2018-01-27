const path = require('path')
const webpack = require('webpack')

const userOptions = require(path.resolve('stylegator.config'))
const webpackConfig = require('../webpack.config.js')

const command = 'build'

const description = 'builds a Stylegator project for production'

const handler = argv =>
  webpack(webpackConfig(userOptions), (err, stats) => {
    console.log('Stylegator built!')
  })

module.exports = {
  command,
  description,
  handler,
}
