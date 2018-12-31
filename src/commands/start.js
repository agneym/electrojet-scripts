const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const webpackMerge = require("webpack-merge");
const spawn = require("cross-spawn");

async function start() {
  const env = "DEV";
  const ownConfig = require("../webpack.config.js")({
    env,
  });
  const userConfig = require(process.cwd()+"/electrojet.config.js");

  const config = userConfig.plugins.reduce((acc, configFn) => {
    return webpackMerge(acc, configFn(env));
  }, ownConfig);

  const compiler = webpack(config);

  const server = new webpackDevServer(compiler, {
    contentBase: process.cwd(),
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    clientLogLevel: 'none',
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

module.exports = start;