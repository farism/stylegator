import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import {
  addPlugins,
  babel,
  createConfig,
  css,
  customConfig,
  entryPoint,
  env,
  file,
  match,
  sass,
  setEnv,
  setOutput,
  sourceMaps,
} from 'webpack-blocks'

import defaultConfig from './defaultConfig'
import AppendixPlugin from './webpackAppendixPlugin'

const raw = () => {
  return (context, { merge }) =>
    merge({
      module: {
        rules: [{ ...context.match, use: ['raw-loader'] }],
      },
    })
}

module.exports = userConfig => {
  const { srcDir, entryPoint: entry, buildDir, template, title } = {
    ...defaultConfig,
    ...userConfig,
  }

  return createConfig([
    entryPoint(path.resolve(process.cwd(), srcDir, entry)),
    match('*.md', [raw()]),
    match('*.js', [
      babel({
        presets: ['env', 'react'],
        plugins: ['syntax-dynamic-import', 'transform-object-rest-spread'],
      }),
    ]),
    match('*.scss', [
      css.modules({ localIdentName: '[local]--[hash:base64:5]' }),
      sass(),
    ]),
    match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg'], [file()]),
    addPlugins([
      new HtmlWebpackPlugin({ title, template: `${srcDir}/${template}` }),
      new CopyWebpackPlugin([{ from: `${srcDir}/assets`, to: `assets` }]),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new AppendixPlugin(),
    ]),
    setOutput({
      path: path.resolve(process.cwd(), buildDir),
    }),
    env('production', [
      setOutput({
        filename: '[name].[hash].js',
      }),
    ]),
    env('development', [setOutput({ filename: '[name].js' }), sourceMaps()]),
  ])
}
