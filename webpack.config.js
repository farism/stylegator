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

const defaults = {
  srcDir: 'src',
  entryPoint: 'index.js',
  outDir: 'build',
}

// require config
const userConfig = (modulePath => {
  try {
    return Object.assign({}, defaults, require(modulePath))
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

const htmlPluginOptions = ({ srcDir, title, template }) => {
  const opts = {}

  if (title) {
    opts.title = title
  }

  if (template) {
    opts.template = `${srcDir}/${template}`
  }

  return opts
}

module.exports = createConfig([
  entryPoint(
    path.resolve(process.cwd(), userConfig.srcDir, userConfig.entryPoint)
  ),
  babel({
    presets: ['env', 'react'],
    plugins: ['syntax-dynamic-import'],
  }),
  match('*.md', [raw()]),
  match('*.scss', [
    css.modules({ localIdentName: '[local]--[hash:base64:5]' }),
    sass(),
  ]),
  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg'], [file()]),
  addPlugins([
    new HtmlWebpackPlugin(htmlPluginOptions(userConfig)),
    new WebpackCleanupPlugin(),
    new CopyWebpackPlugin([
      {
        from: `${userConfig.srcDir}/assets`,
        to: `assets`,
      },
    ]),
  ]),
  setOutput({
    path: path.resolve(process.cwd(), userConfig.buildDir),
  }),
  env('production', [
    setOutput({
      filename: '[name].[hash].js',
    }),
  ]),
  env('development', [
    setOutput({ filename: '[name].js' }),
    devServer({ port: 8080 }),
    sourceMaps(),
  ]),
  customConfig({
    resolveLoader: {
      modules: [path.resolve(process.cwd(), 'node_modules')],
    },
  }),
])
