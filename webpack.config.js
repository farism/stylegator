const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
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

// require config
const userConfig = (modulePath => {
  try {
    return require(modulePath)
  } catch (e) {
    return false
  }
})(path.resolve(process.cwd(), './stylegator.config'))

const raw = () => {
  return (context, { merge }) =>
    merge({
      module: {
        rules: [Object.assign({ use: ['raw-loader'] }, context.match)],
      },
    })
}

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

module.exports = createConfig([
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
  addPlugins([
    new WebpackCleanupPlugin(),
    new CopyWebpackPlugin([{ from: './src/assets', to: 'src/assets' }]),
    new HtmlWebpackPlugin(htmlPluginOptions(userConfig)),
  ]),
  setOutput({ path: path.resolve(process.cwd(), 'build') }),
  env('production', [setOutput({ filename: '[name].[hash].js' })]),
  env('development', [
    setOutput({ filename: '[name].js' }),
    devServer({ port: 8080 }),
    sourceMaps(),
  ]),
  customConfig({
    resolveLoader: {
      modules: [path.resolve(__dirname, 'node_modules')],
    },
  }),
])
