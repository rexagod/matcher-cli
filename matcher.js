// eslint-disable-next-line new-cap
const vorpal = new require('vorpal')();
const _commands = require('./src/matcher-commands.js');
const _orbify = require('./src/matcher-orbify.js');
const envVars = require('./.env_vars.json');

vorpal
    .delimiter('matcher-cli > ')
    .show();

if (envVars.ENV === 'PROD') {
  _commands = envVars.COMMAND_ENDPOINT;
  _orbify = envVars.ORBIFY_ENDPOINT;
}

// eslint-disable-next-line no-unused-vars
const {commands} = _commands;
// eslint-disable-next-line no-unused-vars
const {orbify} = _orbify;

// Pattern-matching
vorpal
    .command('match <X> <Y>', 'Outputs pairs of key-points.')
    .action(orbifyHelper);

function orbifyHelper(args) {
  const {X, Y} = args;
  const resolve = (A) => require('path').resolve(A);
  orbify({X: resolve(X), Y: resolve(Y)});
}

// Updates, deploys, and other queries
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
