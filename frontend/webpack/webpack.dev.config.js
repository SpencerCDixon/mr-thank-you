const path = require('path');
const webpack = require('webpack');

const config = require('./webpack.common.config.js');

config.devtool = "cheap-eval-source-map";
config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
)
config.devServer = {
  port: 3000,
  compress: true,
  contentBase: path.join(__dirname, '..', 'dist'),
  hot: true,
};

module.exports = config
