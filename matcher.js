const vorpal = new require('vorpal')();
const {commands} = require('./src/matcher-commands.js');

vorpal
.delimiter('matcher-cli > ')
.show();

vorpal
.command('matcher <query>', `
  start: Checks, and updates matcher.js, and deploys matcher.js on local server.
  clear: Clears console, and exits.
 `)
.action(vorpalify);

function vorpalify(args) {
  const query = args.query;
  eval(`commands.${query}()`);
}
