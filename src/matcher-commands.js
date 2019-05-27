const _updater = require('./matcher-updater');
const _summon = require('./matcher-summon');

if (require('../.env_vars.json').ENV === 'PROD') {
  _updater = require('../node_modules/@matcher-cli/main/src/matcher-updater');
  _summon = require('../node_modules/@matcher-cli/main/src/matcher-summon');
}

const {updateModules} = _updater;
const {summon} = _summon;

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
	process.stdout.write('\033c');
}

exports.commands = {start: start, clear: clear};