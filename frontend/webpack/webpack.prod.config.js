const webpack = require('webpack');
const common = require('./webpack.common.config.js');
const Visualizer = require('webpack-visualizer-plugin');

common.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new Visualizer()
)

module.exports = common;
