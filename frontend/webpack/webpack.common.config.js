const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "..", "src"),
  output: path.join(__dirname, "..", "..", "dist"),
  entry: path.join(__dirname, "..", "src", "main.js"),
};

module.exports = {
  entry: PATHS.entry,
  output: {
    filename: "bundle.js",
    path: PATHS.output
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  resolve: {
    modules: [
      PATHS.src,
      "node_modules"
    ],
    alias: {
      "react": "preact",
    }
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./index.tmpl.html")
    })
  ]
};