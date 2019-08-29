// 分离出第三方库(vendor.js)、自定义公共模块(common.js)、webpack运行文件(runtime.js)

const path = require('path');
const webpack = require('webpack');
const package = require('./package');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: {
    first: './src/first.js',
    second: './src/second.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // 对入口文件及其依赖的模块进行遍历，如果该模块是js文件并且在node_modules中，就会加入到vendor当中。
        // 这也是一种让vendor只保留第三方库的办法。
        console.log(module.resource, `引用次数${count}`);
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
        );
      }
    }),
    // 从vendor.js中分离出webpack runtime文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // 从first.js和和second.js中分离出common.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].js',
      chunks: ['first', 'second']
    }),
    // new BundleAnalyzerPlugin()
  ]
};

module.exports = config;
