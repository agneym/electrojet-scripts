const detect = require("detect-port")
const Confirm = require('prompt-confirm');

async function getPort(userPort) {
  const _port = await detect(userPort)
  if(_port === userPort) {
    return userPort;
  } else {
    const prompt = new Confirm(`
      Seems like ${userPort} is being used by another application.
      Would you like to try ${_port}?
    `);
    const answer = await prompt.run();
    if(!answer) {
      console.warn("Consider rerunning the script with --port flag");
      process.exit();
    } else {
      return _port;
    }
  }
}

module.exports = getPort;