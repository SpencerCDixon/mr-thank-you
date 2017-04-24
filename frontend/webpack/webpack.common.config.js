const path = require('path');

const PATHS = {
  output: path.join(__dirname, '..', '..', 'dist'),
  entry: path.join(__dirname, '..', 'src', 'main.js'),
}

module.exports = {
  entry: PATHS.entry,
  output: {
    filename: 'bundle.js',
    path: PATHS.output,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /(node_modules)/, use: { loader: 'babel-loader', } },
    ]
  },
};
