const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const merge = require("webpack-merge");
const HtmlWebpackMultiBuildPlugin = require("html-webpack-multi-build-plugin");

const settings = require("./webpack.settings");
const common = require("./webpack.common.js");

const LEGACY_CONFIG = "legacy";
const MODERN_CONFIG = "modern";

// Configure Bundle Analyzer
const configureBundleAnalyzer = (buildType) => {
  if (buildType === LEGACY_CONFIG) {
    return {
      analyzerMode: "static",
      reportFilename: "report-legacy.html",
    };
  }
  if (buildType === MODERN_CONFIG) {
    return {
      analyzerMode: "static",
      reportFilename: "report-modern.html",
    };
  }
};

const configureCSSLoader = () => {
  return {
    test: /\.s?css$/,
    sideEffects: true,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          importLoaders: 2,
          modules: { localIdentName: "[hash:base64:4]" },
        },
      },
      "sass-loader",
    ],
  };
};

const configureOptimization = () => ({
  // split webpack runtime/manifest code into a separate chunk
  // so that hashes stay same when rebuilding without changes
  runtimeChunk: "single",
  usedExports: true,
  splitChunks: {
    chunks: "all",
  },
  minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    }),
  ],
});

const configureHTML = {
  template: settings.templatePath, // use our own template!,
  filename: "index.html",
  inject: false, // important! cuz we gonna place the <link> and <script> ourselves
  mode: process.env.NODE_ENV,
};

module.exports = [
  merge(common.legacyConfig, {
    mode: "production",
    output: {
      filename: `${settings.jsFolder}/[name].[chunkhash].legacy.js`,
      path: settings.outputPath,
      chunkFilename: "[name].[chunkhash].legacy.js",
      publicPath: "/",
    },
    devtool: "source-map",
    optimization: configureOptimization(),
    module: {
      rules: [configureCSSLoader()],
    },
    plugins: [
      new BundleAnalyzerPlugin(configureBundleAnalyzer(LEGACY_CONFIG)),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[name].[contenthash].css",
      }),
      new HtmlWebpackPlugin(configureHTML),
      new HtmlWebpackMultiBuildPlugin(),
      new webpack.HashedModuleIdsPlugin(),
    ],
  }),
  merge(common.modernConfig, {
    mode: "production",
    output: {
      filename: `${settings.jsFolder}/[name].[chunkhash].js`,
      path: settings.outputPath,
      chunkFilename: "[name].[chunkhash].js",
      publicPath: "/",
    },
    devtool: "source-map",
    optimization: configureOptimization(),
    module: {
      rules: [configureCSSLoader()],
    },
    plugins: [
      new BundleAnalyzerPlugin(configureBundleAnalyzer(MODERN_CONFIG)),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[name].[contenthash].css",
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(configureHTML),
      new HtmlWebpackMultiBuildPlugin(),
      new webpack.HashedModuleIdsPlugin(),
    ],
  }),
];
