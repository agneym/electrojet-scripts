const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const spawn = require('cross-spawn')

const {getConfig, getWebpackConfig} = require('../extensions/getConfig')

/**
 * Triggered when start command is run from the CLI
 * Runs webpack dev server and sets electron on watch
 * @param {object} cli
 */
async function start () {
  const env = 'dev'

  const config = await getConfig()

  const webpackConfig = getWebpackConfig(env, config.plugins)
  const compiler = webpack(webpackConfig)

  const server = new WebpackDevServer(compiler, {
    contentBase: process.cwd(),
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    clientLogLevel: 'none'
  })

  server.listen(4567, 'localhost', (err) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    spawn(`npx electron .`, {
      shell: true,
      stdio: 'inherit',
      stderr: 'inherit'
    })
  })
}

module.exports = start
