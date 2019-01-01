const webpack = require('webpack')
const packager = require('electron-packager')
const ora = require("ora")

const getWebpackConfig = require('../extensions/getWebpackConfig')
const getPackagerConfig = require('../extensions/getPackagerConfig')

/**
 * Triggered when start command is run from the CLI
 * Runs webpack dev server and sets electron on watch
 * @param {Object} cli
 */
async function build (cli) {
  const env = 'PROD'

  const config = getWebpackConfig(env)
  const compiler = webpack(config)

  compiler.run(async (err, stats) => {
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

    const spinner = ora("Starting to generate build").start()

    try {
      const config = getPackagerConfig()
      const appPaths = await packager(config)
      spinner.succeed(`Generated builds successfully at
        ${appPaths.join('\n')}
      `);
    } catch(error) {
      spinner.fail(`Could not generate build :(
        ${error}  
      `)
    }
  })
}

module.exports = build
