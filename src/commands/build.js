const appRoot = require("app-root-path");
const webpack = require("webpack");

module.exports = {
  name: 'build',
  run: async toolbox => {
    const {
      system: { spawn }, 
    } = toolbox;
    
    const config = require("../webpack.config.js");
    const compiler = webpack(config);

    compiler.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
        return;
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      spawn(`npm run build`, {
        shell: true,
        stdio: 'inherit',
        stderr: 'inherit'
      });
    })
  }
}