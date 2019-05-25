"use strict";

var _require = require('./src/matcher-updater'),
    updateModules = _require.updateModules;

var _require2 = require('./src/matcher-summon'),
    summon = _require2.summon;

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