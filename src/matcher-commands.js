const _updater = require('./matcher-updater');
const _summon = require('./matcher-summon');

if (require('../.env_vars.json').ENV === 'PROD') {
  _updater = require('../node_modules/@matcher-cli/main/src/matcher-updater');
  _summon = require('../node_modules/@matcher-cli/main/src/matcher-summon');
}

const {updateModules} = _updater;
const {summon} = _summon;

// separate logic for start(server) and update?
function start() {
  if (updateModules.isOutdated()) {
    try {
      updateModules.takeAction();
    } catch (e) {
      process.stderr.write(e);
    }
  }
  summon();
}

function clear() {
  process.stdout.write('\u001b[2J\u001b[0;0H');
}

exports.commands = {start: start, clear: clear};
