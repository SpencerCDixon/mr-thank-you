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
  clientLogLevel: 'error',
  proxy: {
    "/ws": {
      target: "ws://localhost:3001",
      ws: true,
    },
    "/api": {
      target: "http://localhost:3001",
    }
  }
};

module.exports = config
