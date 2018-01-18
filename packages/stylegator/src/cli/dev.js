const execa = require('execa')

const dev = () => {
  const proc = execa(
    'npx',
    ['webpack-dev-server', '--config=webpack.config.js'],
    { env: { NODE_ENV: 'development' } }
  )

  proc.stdout.pipe(process.stdout)

  proc.stderr.pipe(process.stderr)

  return proc
}

module.exports = dev
