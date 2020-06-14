module.exports = {
  env: {
    // This is the config we'll use to generate bundles for legacy browsers.
    legacy: {
      presets: [
        [
          "@babel/preset-env",
          {
            debug: true,
            modules: false, // don't transpile into CommonJS. crucial for tree-shaking
            corejs: 3,
            useBuiltIns: "usage",
            targets: {
              browsers: [
                /**
                 *  Browser List: https://bit.ly/2FvLWtW
                 *  `defaults` setting gives us IE11 and others at ~86% coverage
                 */
                "defaults",
              ],
            },
          },
        ],
      ],
      plugins: [
        [
          "@babel/plugin-transform-react-jsx",
          {
            pragma: "h",
          },
        ],
      ],
    },
    // This is the config we'll use to generate bundles for modern browsers.
    modern: {
      presets: [
        [
          "@babel/preset-env",
          {
            debug: true,
            modules: false, // don't transpile into CommonJS. crucial for tree-shaking
            corejs: 3,
            useBuiltIns: "usage",
            targets: {
              // This will target browsers which support ES modules.
              esmodules: true,
            },
          },
        ],
      ],
      plugins: [
        [
          "@babel/plugin-transform-react-jsx",
          {
            pragma: "h",
          },
        ],
      ],
    },
  },
};
