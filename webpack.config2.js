// 分离出第三方库和自定义公共模块(vendor.js)、webpack运行文件(runtime.js)

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
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vendor', 'runtime'],
    //   filename: '[name].js'
    // }),
    //　等价于下面的
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].js'
    }),
    // 创建一个名为runtime的commons chunk进行webpack运行文件的抽离，其中source chunks是vendor.js。
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'runtime',
    //   filename: '[name].js',
    //   chunks: ['vendor']
    // }),
    // new BundleAnalyzerPlugin()
  ]
};

module.exports = config;
