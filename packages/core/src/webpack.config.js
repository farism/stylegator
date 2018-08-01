import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
// import {
//   addPlugins,
//   babel,
//   createConfig,
//   css,
//   customConfig,
//   entryPoint,
//   env,
//   file,
//   match,
//   sass,
//   setEnv,
//   setOutput,
//   sourceMaps,
// } from 'webpack-blocks'

import defaultConfig from './defaultConfig'
import AppendixPlugin from './webpackAppendixPlugin'

// const raw = () => {
//   return (context, { merge }) =>
//     merge({
//       module: {
//         rules: [{ ...context.match, use: ['raw-loader'] }],
//       },
//     })
// }

// const resolveUrl = () => (context, { merge }) =>
//   merge({
//     module: {
//       rules: [
//         Object.assign({
//           test: context.match.test,
//           use: ['style-loader', 'css-loader', 'resolve-url-loader'],
//         }),
//       ],
//     },
//   })

// export default userConfig => {
//   const {
//     srcDir,
//     entryPoint: entry,
//     buildDir,
//     contentBase,
//     template,
//     title,
//   } = {
//     ...defaultConfig,
//     ...userConfig,
//   }

//   return createConfig([
//     entryPoint(['babel-polyfill', path.resolve(process.cwd(), srcDir, entry)]),
//     match(['*.md'], [raw()]),
//     match(['*.css'], [resolveUrl()]),
//     match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg'], [file()]),
//     match(['*.eot', '*.ttf', '*.otf', '*.woff', '*.woff2'], [file()]),
//     match(
//       ['*.scss'],
//       [css.modules({ localIdentName: '[local]--[hash:base64:5]' }), sass()]
//     ),
//     match(
//       ['*.js', '*.jsx'],
//       [
//         babel({
//           presets: ['env', 'react'],
//           plugins: ['syntax-dynamic-import', 'transform-object-rest-spread'],
//         }),
//       ]
//     ),
//     addPlugins([
//       new HtmlWebpackPlugin({ title, template: `${srcDir}/${template}` }),
//       new CopyWebpackPlugin([{ from: `${srcDir}/${contentBase}`, to: `./` }]),
//       new webpack.NamedModulesPlugin(),
//       new webpack.HotModuleReplacementPlugin(),
//       new AppendixPlugin(),
//     ]),
//     setOutput({
//       path: path.resolve(process.cwd(), buildDir),
//     }),
//     env('production', [
//       setOutput({
//         filename: '[name].[hash].js',
//       }),
//     ]),
//     env('development', [setOutput({ filename: '[name].js' }), sourceMaps()]),
//   ])
// }

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
    mode: 'development',

    entry: {
      main: path.resolve(process.cwd(), srcDir, entry),
    },

    output: {
      path: path.resolve(__dirname, buildDir),
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
                presets: ['babel-preset-env'],
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
