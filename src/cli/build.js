const path = require('path')
const webpack = require('webpack')

const config = require('../../webpack.config.js')

const build = () => {
  return new Promise((resolve, reject) => {
    webpack(config('production'), (err, stats) => {
      resolve(stats)
    })
  })
}

module.exports = build
