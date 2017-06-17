const webpack = require('webpack');
const common = require('./webpack.common.config.js');
const CompressionPlugin = require('compression-webpack-plugin');

// const Visualizer = require('webpack-visualizer-plugin');

common.plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.optimize.UglifyJsPlugin(),
  // new Visualizer()
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8
  })
);

module.exports = common;
