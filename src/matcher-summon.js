const puppeteer = require('puppeteer');
const exec = require('child_process').exec;
const envVars = require('../.env_vars');

function summoner() {
  initiateServer();
  invoke({});
  // eslint-disable-next-line no-invalid-this
  const {summon: self} = this;
  return self;
};

function initiateServer() {
  exec(`live-server ${envVars.MATCHER_PATH} --quiet --port=9990 --no-browser`,
      function(error, stdout, stderr) {
        // process.stdout.write(stdout);
        // process.stderr.write(stderr);
        if (error) {
        // process.stderr.write(error);
          process.exit();
        }
      });
}

async function invoke() {
  const browser = await puppeteer.launch(
      {args: ['--no-sandbox', '--headless', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(`http://${envVars.HOST}:${envVars.PORT}`);
  // get points etc.
  await browser.close();
}

exports.summon = summoner;
