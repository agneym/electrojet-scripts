const cosmiconfig = require('cosmiconfig')

const defaultConfig = {
  dir: process.cwd(),
  all: true,
}

/**
 * Returns configuration for electron packager merging user and default options
 * @returns {Object}
 */
async function getPackagerConfig() {
  const explorer = cosmiconfig("electrojet")
  const result = await explorer.search()
  
  if(result.isEmpty) {
    return defaultConfig
  } else {
    return Object.assign({}, defaultConfig, result.config.buildOptions || {})
  }
}

module.exports = getPackagerConfig