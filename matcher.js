// eslint-disable-next-line new-cap
const vorpal = new require('vorpal')();
const _commands = require('./src/matcher-commands.js');

vorpal
    .delimiter('matcher-cli > ')
    .show();

if (require('./.env_vars.json').ENV === 'PROD') {
  _commands = require('../node_modules/@matcher-cli/main/src/matcher-commands');
}

// eslint-disable-next-line no-unused-vars
const {commands} = _commands;

// add an ENV $PATH ?
vorpal
    .command('matcher <query>', `start: Updates matcher.js & locally deploys it.
         clear: Clears console, and exits.`)
    .action(vorpalify);

function vorpalify(args) {
  const query = args.query;
  if (eval(`commands.${query}`) !== undefined) {
    eval(`commands.${query}()`);
  } else {
    process.stderr.write('Invalid command, exiting...\n');
    process.exit();
  }
}
