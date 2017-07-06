'use strict';

const webpack        = require('webpack');
const path           = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {

  // Entry point
  entry: {
    'js/index': './src/js/index',
    'js/index.jquery': './src/js/index.jquery'
  },

  // Output settings
  output: {
    filename: '[name].js'
  },

  // Webpack's plugins
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'js/index.jquery',
      minChunks: Infinity,
    }),
    new WebpackMd5Hash(),

    new webpack.NoEmitOnErrorsPlugin()
  ],

  // Configure module loading (paths, default paths)
  resolve: {
    extensions: ['.js'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {
    // Configure file loaders
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, path.resolve(__dirname, 'src/js/modules/dep')],
        options: {
          presets: ['es2015', 'stage-2']
        }
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$'
      }
    ]
  }
};