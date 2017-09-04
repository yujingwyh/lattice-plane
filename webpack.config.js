let path = require('path');
let webpack = require('webpack');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html',
      inject: true,
      favicon: './src/image/favicon.png',
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        minifyJS: false,
        minifyCSS: false
      },
      hash: true
    })
  ],
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './web/dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: 'url-loader?limit=8192'
      },
      {
        test: /\.(woff|eot|ttf)$/i,
        loader: 'url-loader?limit=10000&name=fonts/[hash:8].[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      }
    ]
  },
  resolve: {
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: './web/',
    publicPath: '/dist/',
    inline: true,
    open: true,
    port: 8800
  },
  devtool: '#eval-source-map'
};
