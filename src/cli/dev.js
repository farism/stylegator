const execa = require('execa')
const path = require('path')
const webpack = require('webpack')

const dev = () => {
  const proc = execa(
    './node_modules/.bin/webpack-dev-server',
    ['--config=webpack.config.js'],
    { env: { NODE_ENV: 'development' } }
  )

  proc.stdout.pipe(process.stdout)

  proc.stderr.pipe(process.stderr)

  return proc
}

module.exports = dev
