import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

import defaultConfig from './defaultConfig'
import AppendixPlugin from './webpackAppendixPlugin'

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

  return {
    entry: {
      main: path.resolve(process.cwd(), srcDir, entry),
    },

    output: {
      path: path.resolve(process.cwd(), buildDir),
      filename: '[name].js',
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
                presets: ['babel-preset-env', 'babel-preset-react'],
                plugins: [
                  'babel-plugin-syntax-dynamic-import',
                  'transform-object-rest-spread',
                ],
              },
            },
          ],
        },
        {
          test: /\.s?css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.(gif|jpg|jpeg|png|svg|eot|ttf|otf|woff|woff2)$/,
          use: [{ loader: 'file-loader' }],
        },
        {
          test: /\.md$/,
          use: [{ loader: 'raw-loader' }],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({ title, template: `${srcDir}/${template}` }),
      new CopyWebpackPlugin([{ from: `${srcDir}/${contentBase}`, to: `./` }]),
      new webpack.NamedModulesPlugin(),
      new AppendixPlugin(),
    ],
  }
}
