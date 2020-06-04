const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',

  entry: [
    './src/js/main.js' // Your entry point
  ],

  output: {
    path: path.resolve(__dirname, 'public'),
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
                        useBuiltIns: 'usage',
                        loose: true,
                        shippedProposals: true,
                        corejs: 3
                    }],
                    '@babel/react'
                ]
            }
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    url: false
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: () => [
                        require('postcss-preset-env')({
                            features: {
                                'custom-properties': {
                                    preserve: false
                                }
                            }
                        })
                    ]
                }
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
        ]
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

  devtool: '#inline-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'stylesheets/[name].css',
      chunkFilename: '[id].css'
    }),
  ]
};