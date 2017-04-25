const webpack = require('webpack');
const common = require('./webpack.common.config.js');

common.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  })
)

module.exports = common;
