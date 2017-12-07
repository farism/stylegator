const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('../../webpack.config.js')

const dev = () => {
  console.log('starting styleguider...')

  return new Promise((resolve, reject) => {
    new WebpackDevServer(webpack(config('development')), {
      hot: true,
      quiet: true,
    }).listen('8080', 'localhost', err => {
      if (err) {
        console.error(e)
        reject(err)
      } else {
        console.log('styleguider started on http://localhost:8080')
        resolve()
      }
    })
  })
}

module.exports = dev
