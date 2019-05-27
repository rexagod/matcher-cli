const puppeteer = require('puppeteer');
const exec = require('child_process').exec;
const envVars = require('../.env_vars');

function summoner() {
  initiateServer();
  invoke();
  // eslint-disable-next-line no-invalid-this
  const {summon: self} = this;
  return self;
};

function initiateServer() {
  exec(`live-server ${envVars.MATCHER_PATH} --quiet --port=9990 --no-browser &`,
      function(error, stdout, stderr) {
        process.stdout.write(stdout);
        process.stderr.write(stderr);
        if (error) {
          process.stderr.write(error);
          process.exit();
        }
      });
  process.stdout.write('✌ Server\'s up!');
}

async function invoke() {
  const browser = await puppeteer.launch(
      {args: ['--no-sandbox', '--headless', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(`http://${envVars.HOST}:${envVars.PORT}`);
  /*
  * ~~~~~~~~~~~~~~~
  * injection point
  * ~~~~~~~~~~~~~~~
  * relevant key points will be "given out"
  * from this space once a stable connection
  * with the above locally deployed server
  * is established w/ appropriate commands
  */
  await browser.close();
}

exports.summon = summoner;
