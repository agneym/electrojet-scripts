const webpackMerge = require('webpack-merge')

/**
 * Returns the required webpack configuration merging user and provided configs
 * @param {enum} env - Current running environment
 * @returns {Object}
 */
function getWebpackConfig (env) {
  const ownConfig = require('../webpack.config.js')({
    env
  })
  const userConfig = require(process.cwd() + '/electrojet.config.js')

  return userConfig.plugins.reduce((acc, configFn) => {
    return webpackMerge(acc, configFn(env))
  }, ownConfig)
}

module.exports = getWebpackConfig
