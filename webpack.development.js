const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");

const settings = require("./webpack.settings");
const common = require("./webpack.common.js");

const devConfig = {
  output: {
    filename: "[name].js",
    path: settings.outputPath,
    chunkFilename: "[name].js",
    publicPath: "/",
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-cheap-module-source-map",
  devServer: {
    stats: "errors-only",
    clientLogLevel: "error",
    contentBase: settings.outputPath,
    historyApiFallback: true,
    port: 8008,
    hot: true, // enable hot module replacement
    overlay: true, // show compiler error as overlay on browser
    watchContentBase: true, // watch files served from contentbase
    watchOptions: { ignored: /node_modules/ },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: settings.templatePath, // use our own template!,
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: { localIdentName: "[name]__[local]" }, // try add [path] too
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
};

// Development module exports
module.exports = merge(common.modernConfig, devConfig);
