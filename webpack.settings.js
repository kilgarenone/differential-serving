const path = require("path");

module.exports = {
  outputPath: path.resolve(__dirname, "./dist"),
  srcPath: path.resolve(__dirname, "./src"),
  entryPath: path.resolve(__dirname, "./src/index.js"),
  templatePath: path.resolve(__dirname, "./src/index.html"),
  jsFolder: "js",
  imagesFolder: "img",
  fontsFolder: "fonts",
  babelLoaderConfig: {
    exclude: [/(node_modules|bower_components)/],
  },
};
