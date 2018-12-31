const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const spawn = require("cross-spawn");

const getWebpackConfig = require("../extensions/getWebpackConfig");

async function start() {
  const env = "DEV";
  
  const config = getWebpackConfig(env);
  
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