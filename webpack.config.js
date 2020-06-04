const path = require('path');
const webpack = require('webpack');
// const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',

  // entry: './src/js/main.js',

  entry: [
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/js/main.js' // Your entry point
  ],

  output: {
    // filename: 'main.bundle.js',
    // publicPath: path.resolve(__dirname, 'public/javascripts'),

    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                babelrc: false,
                presets: [
                    ['@babel/preset-env', {
                        // useBuiltIns: 'usage',
                        // loose: true,
                        // shippedProposals: true,
                        // corejs: 2
                    }],
                    '@babel/react'
                ]
            }
        }
      },
      {
        test: /\.(html)$/,
        use: {
            loader: 'html-loader',
            options: { attrs: false }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
        // components: path.resolve(__dirname, 'src/react/components'),
    }
},

  // devtool: '#inline-source-map',

  // devServer: {
    // open: true,
    // port: 8081,
    // publicPath: '/',
    // proxy: {
    //     '*': 'http://0.0.0.0:3000'
    // },
    // stats: 'errors-only',
  // },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new HtmlWebPackPlugin({
    //   template: "./views/index.twig",
    //   filename: "./index.twig"
    // })
  ]
};