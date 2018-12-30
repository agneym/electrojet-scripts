const appRoot = require("app-root-path");
const webpack = require("webpack");

module.exports = {
  name: 'build',
  run: async toolbox => {
    const {
      filesystem: { read },
    } = toolbox;
    const config = read('../webpack.config.js', 'json');
    console.log(config);
  }
}