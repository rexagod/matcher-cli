const puppeteer = require('puppeteer');
const exec = require('child_process').exec;
const envVars = require('../.env_vars');
const {matcherInitQuery} = require('../utils/matcher-init-query');
const {ping, error} = require('../utils/matcher-pings');

const summoner = (function() {
  initiateServer();
  return invoke();
  // eslint-disable-next-line no-invalid-this
  // const {summon: self} = this;
  // return self;
})();

function initiateServer() {
  exec(matcherInitQuery,
      function(e, stdout, stderr) {
        ping(stdout);
        error(stderr);
        if (e) {
          error(e);
          process.exit();
        }
      });
  ping(`Server\'s up @ http://${envVars.HOST}:${envVars.PORT}\n`);
}

async function invoke() {
  const browser = await puppeteer.launch(
      {args: ['--no-sandbox', '--headless', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  // FUNCTION GLOBALS
  corners=[];
  matches=[];
  bufferInterval=1000;
  // SHARED-SCOPE UTILS
  function getDistinctCorners(string) {
    if (isCorner(string)) {
      const truncatedString = (string).substring(8);
      const truncatedObject = JSON.parse(truncatedString);
      if (corners.indexOf(truncatedObject) === -1 && corners.length < 500) {
        corners.push(truncatedObject);
      }
    }
  }
  function getDistinctMatches(string) {
    if (isPair(string)) {
      const truncatedString = (string).substring(6);
      const truncatedObject = JSON.parse(truncatedString);
      if (matches.indexOf(truncatedObject) === -1
      && matches.length < truncatedObject.population) {
        matches.push(truncatedObject);
      }
    }
  }
  await page.goto(`http://${envVars.HOST}:${envVars.PORT}`);
  page.on('console', (args) => {
    const text = args._text;
    getDistinctCorners(text);
    getDistinctMatches(text);
  });
  do {
    await page.waitFor(bufferInterval);
    bufferInterval+=500;
  } while (!matches.length || !corners.length);
  await browser.close();
  return {matches: matches, corners: corners};
}

function isCorner(string) {
  return /^Corners:/.test(string);
}

function isPair(string) {
  return /^Pairs:/.test(string);
}

exports.summon = {summoner: summoner};
