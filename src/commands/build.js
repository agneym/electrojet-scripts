const webpack = require('webpack')
const spawn = require('cross-spawn')
const packager = require('electron-packager')

const getWebpackConfig = require('../extensions/getWebpackConfig')

/**
 * Triggered when start command is run from the CLI
 * Runs webpack dev server and sets electron on watch
 * @param {Object} cli
 */
async function build (cli) {
  const env = 'PROD'

  const config = getWebpackConfig(env)
  const compiler = webpack(config)

  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
      return
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }

    await packager({
      dir: process.cwd(),
      all: true,
    })
  })
}

module.exports = build
