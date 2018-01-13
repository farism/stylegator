const execa = require('execa')
const path = require('path')
const webpack = require('webpack')

const dev = () => {
  const proc = execa(
    './node_modules/.bin/webpack-dev-server',
    ['--config=./node_modules/stylegator/webpack.config.js'],
    {
      env: { NODE_ENV: 'development' },
    }
  )

  proc.stdout.pipe(process.stdout)

  return proc
}

module.exports = dev
