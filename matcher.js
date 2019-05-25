const {updateModules} = require('./src/matcher-updater');
const {summon} = require('./src/matcher-summon');

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
