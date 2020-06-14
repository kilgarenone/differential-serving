const path = require("path");
const merge = require("webpack-merge");

const settings = require("./webpack.settings");

// Configure Babel loader
const configureModernBabelLoader = () => {
  return {
    test: /\.m?js$/,
    exclude: settings.babelLoaderConfig.exclude, // remove this when library authors ship ESM
    use: {
      loader: "babel-loader",
      options: {
        envName: "modern", // Points to env.modern in babel.config.js
      },
    },
  };
};
// Configure Babel loader
const configureLegacyBabelLoader = () => {
  return {
    test: /\.js$/,
    exclude: settings.babelLoaderConfig.exclude,
    use: {
      loader: "babel-loader",
      options: {
        envName: "legacy", // Points to env.legacy in babel.config.js
      },
    },
  };
};

const baseConfig = {
  entry: {
    app: settings.entryPath,
  },
  module: {
    rules: [
      // FONT loader
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${settings.fontsFolder}/[name].[hash].[ext]`, // output to /fonts folder under output.path
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js"],
  },
};

// Legacy webpack config
const legacyConfig = {
  module: {
    rules: [configureLegacyBabelLoader()],
  },
};

// Modern webpack config
const modernConfig = {
  module: {
    rules: [configureModernBabelLoader()],
  },
};

module.exports = {
  legacyConfig: merge.strategy({
    module: "prepend",
    plugins: "prepend",
  })(baseConfig, legacyConfig),
  modernConfig: merge.strategy({
    module: "prepend",
    plugins: "prepend",
  })(baseConfig, modernConfig),
};
