const _updater = require('./src/matcher-updater');
const _summon = require('./src/matcher-summon');

if (require('./.env_vars.json').ENV === 'PROD') {
  _updater = require('./node_modules/@matcher-cli/dev/src/matcher-updater');
  _summon = require('./node_modules/@matcher-cli/dev/src/matcher-summon');
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

start();
