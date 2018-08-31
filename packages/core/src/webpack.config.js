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

const resolveUrl = () => (context, { merge }) =>
  merge({
    module: {
      rules: [
        Object.assign({
          test: context.match.test,
          use: ['style-loader', 'css-loader', 'resolve-url-loader'],
        }),
      ],
    },
  })

export default userConfig => {
  const {
    srcDir,
    entryPoint: entry,
    buildDir,
    contentBase,
    template,
    title,
  } = {
    ...defaultConfig,
    ...userConfig,
  }

  return createConfig([
    entryPoint(['babel-polyfill', path.resolve(process.cwd(), srcDir, entry)]),
    match(['*.md'], [raw()]),
    match(['*.css'], [resolveUrl()]),
    match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg'], [file()]),
    match(['*.eot', '*.ttf', '*.otf', '*.woff', '*.woff2'], [file()]),
    match(
      ['*.scss'],
      [css.modules({ localIdentName: '[local]--[hash:base64:5]' }), sass()]
    ),
    match(
      ['*.js', '*.jsx'],
      [
        babel({
          babelrc: false,
          presets: ['env', 'react'],
          plugins: ['syntax-dynamic-import', 'transform-object-rest-spread'],
        }),
      ]
    ),
    addPlugins([
      new HtmlWebpackPlugin({ title, template: `${srcDir}/${template}` }),
      new CopyWebpackPlugin([{ from: `${srcDir}/${contentBase}`, to: `./` }]),
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
