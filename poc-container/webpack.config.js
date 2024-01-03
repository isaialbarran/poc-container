const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.DefinePlugin({
      "process.env.CHILD_CONFIG_URL": JSON.stringify(
        process.env.CHILD_CONFIG_URL
      ),
      "process.env.ROUTE_CONFIG_URL": JSON.stringify(
        process.env.ROUTE_CONFIG_URL
      ),
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000,
    open: true,
  },
};
