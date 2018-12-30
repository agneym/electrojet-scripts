const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const webpackMerge = require("webpack-merge");

module.exports = {
  name: 'start',
  run: async toolbox => {
    const {
      filesystem,
      system: { spawn }, 
    } = toolbox;

    const ownConfig = require("../webpack.config.js");
    const userConfig = require(process.cwd()+"/electrojet.config.js");
    const env = "development";

    const config = userConfig.plugins.reduce((acc, configFn) => {
      return webpackMerge(acc, configFn(env));
    }, ownConfig);

    const compiler = webpack(config);

    const server = new webpackDevServer(compiler, {
      contentBase: process.cwd(),
      hot: true,
      historyApiFallback: true,
      publicPath: '/'
    });

    server.listen(4567, "localhost", (err) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      spawn(`npm run electron`, {
        shell: true,
        stdio: 'inherit',
        stderr: 'inherit'
      });
    });
  }
}