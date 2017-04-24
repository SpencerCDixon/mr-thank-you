const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.common.config.js');

config.devtool = "cheap-eval-source-map";
config.plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './index.tmpl.html'),
  }),
];
config.devServer = {
  port: 3000,
  compress: true,
  contentBase: path.join(__dirname, '..', 'dist'),
};

module.exports = config
