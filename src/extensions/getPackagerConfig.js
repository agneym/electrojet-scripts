const cosmiconfig = require('cosmiconfig')

/**
 * Returns configuration for electron packager merging user and default options
 * @returns {Object}
 */
async function getPackagerConfig() {
  const explorer = cosmiconfig("electrojet")
  const result = await explorer.search()
  
  if(result.isEmpty) {
    return {}
  } else {
    return result.config
  }
}

module.exports = getPackagerConfig