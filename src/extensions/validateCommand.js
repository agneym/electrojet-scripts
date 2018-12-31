const chalk = require("chalk");

function validateCommand(cli, command) {
  const commands = ['start', 'build'];
  if(!command || !commands.includes(command)) {
    chalk.error("Please enter a valid command");
    cli.showHelp();
    return false;
  }
  return true;
}

module.exports = validateCommand;