const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router'],
    app: ['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'assets/[name].[hash].js',
    chunkFilename: 'assets/[name].[chunkhash].js'
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      Trans: path.resolve(__dirname, 'src/components/Trans'),
      utils: path.resolve(__dirname, 'src/utils/index'),
      ajax: path.resolve(__dirname, 'src/utils/ajax'),
      constants: path.resolve(__dirname, 'src/utils/constants'),
      config: path.resolve(__dirname, 'src/utils/config')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: /\.scss|css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: '75-90',
                speed: 3
              }
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css|scss$/,
  //         chunks: 'all',
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.NamedModulesPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'assets/styles.css',
      chunkFilename: '[hash:5].css'
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './index.html'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: './static',
        ignore: ['.*']
      }
    ])
  ]
};
