const webpack = require('webpack')

const config = require('../../webpack.config.js')

const build = () =>
  new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      resolve('Stylegator built!')
    })
  })

module.exports = build
