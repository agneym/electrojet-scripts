const webpack = require("webpack");
const spawn = require("cross-spawn");

const getWebpackConfig = require("../extensions/getWebpackConfig");

async function build() {
  const env = "PROD";
  
  const config = getWebpackConfig(env);
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
  });
}

module.exports = build;