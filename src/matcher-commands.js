const _updater = require('./matcher-updater');
const _summon = require('./matcher-summon');
const {error} = require('../utils/matcher-pings');

if (require('../.env_vars.json').ENV === 'PROD') {
  _updater = require('../node_modules/@matcher-cli/main/src/matcher-updater');
  _summon = require('../node_modules/@matcher-cli/main/src/matcher-summon');
}

const {updateModules} = _updater;
const {summoner} = _summon.summon;

function update() {
  if (updateModules.isOutdated()) {
    try {
      updateModules.takeAction();
    } catch (e) {
      error(e);
    }
  }
}

function clear() {
  error('\u001b[2J\u001b[0;0H');
}

exports.commands = {summoner: summoner, update: update, clear: clear};
