const fs = require('fs');
const exec = require('child_process').exec;
const fetch = require('node-fetch');
const pjson = require('../package.json');

function isLoading(bool) {
  if (bool) {
    process.stdout.write('⏳ ');
  }
}

async function isOutdated() {
  isLoading(true);
  const payload = 'https://raw.githubusercontent.com/rexagod/matcher-cli/master/package.json?token=AIAAUZZOSAQC6EDTDEHUEPS46I2B6';
  const packet = {};
  packet.response = await fetch(payload)
      .then((res) => res.json())
      .catch((e) => process.stderr.write(e));
  packet.current = await packet.response.version;
  packet.user = pjson.version;
  // eslint-disable-next-line   no-invalid-this
  if (packet.user !== packet.current) {
    packet.bool = true;
    return packet;
  } else {
    packet.bool = false;
    return packet;
  }
}

async function takeAction() {
  const packet = await isOutdated();
  if (!packet.bool) {
    process.stdout.write(`\n You are all set!
    Current version: ${packet.current} ✔ \n`);
  } else {
    process.stderr.write(`\n 😱 Found: ${packet.user} 
    ▶ Current: ${packet.current}`);
    upgradeLocal(packet.response);
  }
}

async function upgradeLocal(res) {
  process.stdout.write(`\n 🎁 Updating your cli, just a moment!`);
  await fs.writeFileSync('./package.json', JSON.stringify(res, null, '\t'));
  await npmi();
}

function npmi() {
  exec('npm i', function(error, stdout, stderr) {
    process.stdout.write('\nstdout: ' + stdout);
    process.stdout.write('\nstderr: ' + stderr);
    if (error !== null) {
      process.stderr.write('exec error: ' + error);
    }
  });
}

exports.updateModules = {
  isOutdated: isOutdated,
  takeAction: takeAction,
};
