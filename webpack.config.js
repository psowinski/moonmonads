const path = require('path');

module.exports = {
  entry: "./lib/src/index.js",
  output: {
    path: path.resolve(__dirname,"dist"),
    filename: "moonmonads.js",
    libraryTarget: "umd"
  },
  devtool: "source-map",
  mode: "production"
}
