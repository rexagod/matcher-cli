// eslint-disable-next-line new-cap
const vorpal = new require('vorpal')();
const _commands = require('./src/matcher-commands.js');
const envVars = require('./.env_vars.json');

vorpal
    .delimiter('matcher-cli > ')
    .show();

if (envVars.ENV === 'PROD') {
  _commands = envVars.COMMAND_ENDPOINT;
}

const {commands} = _commands;

vorpal
    .command('matcher <query>', `update: Updates matcher environment.
         clear: Clears console, and exits.
         matches: Outputs pairs of matched key-points.
         corners: Outputs all eligible match points.
         `)
    .action(vorpalify);

async function vorpalify(args) {
  const {query} = args;
  // eslint-disable-next-line no-unused-vars
  const summoner = await commands.summoner;
  if (eval(`commands.${query}`) !== undefined) {
    eval(`commands.${query}()`);
  } else if (eval(`summoner.${query}`)) {
    console.log(eval(`summoner.${query}`));
  } else {
    error(`Invalid command: "${query}", exiting...\n`);
    process.exit();
  }
}
