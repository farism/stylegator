import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'

import defaults from './defaults'
import AppendixPlugin from './webpackAppendixPlugin'

const isDev = process.env.NODE_ENV === 'development'

export default userConfig => {
  const {
    srcDir,
    entryPoint,
    buildDir,
    contentBase,
    template,
    title,
    webpack: userWebpack,
  } = {
    ...defaults,
    ...userConfig,
  }

  return userWebpack(merge, {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'eval-source-map' : 'source-map',
    entry: {
      index: [
        '@babel/polyfill',
        path.resolve(process.cwd(), srcDir, entryPoint),
      ],
    },
    output: {
      path: path.resolve(process.cwd(), buildDir),
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  require.resolve('@babel/preset-env'),
                  require.resolve('@babel/preset-react'),
                ],
                plugins: [
                  require.resolve('@babel/plugin-syntax-dynamic-import'),
                  require.resolve('@babel/plugin-proposal-object-rest-spread'),
                ],
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: `css-loader`,
              options: {
                modules: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'resolve-url-loader'],
        },
        {
          test: /\.md$/,
          use: ['raw-loader'],
        },
        {
          test: /\.(gif|jpe?g|png|svg|eot|ttf|otf|woff2?)$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedChunksPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({ title, template: `${srcDir}/${template}` }),
      new CopyWebpackPlugin([{ from: `${srcDir}/${contentBase}`, to: `./` }]),
      new AppendixPlugin(),
    ],
  })
}
