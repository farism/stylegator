const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const {
  addPlugins,
  babel,
  createConfig,
  css,
  customConfig,
  devServer,
  entryPoint,
  env,
  file,
  match,
  sass,
  setEnv,
  setOutput,
  sourceMaps,
} = require('webpack-blocks')

const raw = () => {
  return (context, { merge }) =>
    merge({
      module: {
        rules: [Object.assign({ use: ['raw-loader'] }, context.match)],
      },
    })
}

// require config
const userConfig = (modulePath => {
  try {
    return require(modulePath)
  } catch (e) {
    return false
  }
})(path.resolve(process.cwd(), './styleguider.config'))

const htmlPluginOptions = ({ title, template }) => {
  const opts = {}
  if (title) {
    opts.title = title
  }
  if (template) {
    opts.template = template
  }

  return opts
}

module.exports = (environment = 'production') =>
  createConfig([
    entryPoint(path.resolve(process.cwd(), './src/index.js')),
    babel(),
    match('*.md', [raw()]),
    match('*.scss', [
      css.modules({
        localIdentName: '[local]--[hash:base64:5]',
      }),
      sass(),
    ]),
    match(['*.gif', '*.jpg', '*.jpeg', '*.png'], [file()]),
    addPlugins([new HtmlWebpackPlugin(htmlPluginOptions(userConfig))]),
    setOutput({ path: path.resolve(process.cwd(), 'build') }),
    setEnv({ NODE_ENV: environment }),
    env('development', [setOutput({ filename: '[name].js' }), sourceMaps()]),
    env('production', [setOutput({ filename: '[name].[hash].js' })]),
    customConfig({
      resolveLoader: {
        modules: [path.resolve(__dirname, 'node_modules')],
      },
    }),
  ])
