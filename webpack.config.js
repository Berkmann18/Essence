var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/essence.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'essence.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.src$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};