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
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        console.log(module.resource, `引用次数${count}`);
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
        );
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      // minChunks: Infinity
      chunks: ['vendor']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].js',
      chunks: ['first', 'second']
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // name: 'first',
      children: true,
      async: 'chunk-vendor',
      minChunks: 2
    }),
    // new BundleAnalyzerPlugin()
  ]
};

module.exports = config;
