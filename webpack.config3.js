// 分离出第三方库(vendor.js)、自定义公共模块(common.js)、webpack运行文件(runtime.js)

const path = require('path');
const webpack = require('webpack');
const package = require('./package');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: {
    first: './src/first.js',
    second: './src/second.js',
    vendor: Object.keys(package.dependencies)
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'runtime'],
      filename: '[name].js',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].js',
      chunks: ['first', 'second']
    }),
    // new BundleAnalyzerPlugin()
  ]
};

module.exports = config;
