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

const raw = () => {
  return (context, { merge }) =>
    merge({
      module: {
        rules: [Object.assign({ use: ['raw-loader'] }, context.match)],
      },
    })
}

const htmlOptions = ({ srcDir, html }) =>
  Object.assign(
    {},
    {
      template: html.srcDir || `${srcDir}/index.html`,
      title: html.title || 'Stylegator Documentation',
    },
    html
  )

module.exports = ({
  entry = 'index.js',
  srcDir = 'src',
  buildDir = 'build',
  html,
}) =>
  createConfig([
    entryPoint(path.resolve(process.cwd(), srcDir, entry)),
    match('*.md', [raw()]),
    match('*.js', [
      babel({
        presets: ['env', 'react'],
        plugins: ['syntax-dynamic-import'],
      }),
    ]),
    match('*.scss', [
      css.modules({ localIdentName: '[local]--[hash:base64:5]' }),
      sass(),
    ]),
    match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg'], [file()]),
    addPlugins([
      new HtmlWebpackPlugin(htmlOptions({ srcDir, html })),
      new WebpackCleanupPlugin(),
      new CopyWebpackPlugin([
        {
          from: `${srcDir}/assets`,
          to: `assets`,
        },
      ]),
    ]),
    setOutput({
      path: path.resolve(process.cwd(), buildDir),
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
  ])
