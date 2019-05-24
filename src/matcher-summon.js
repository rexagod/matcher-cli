const puppeteer = require('puppeteer');
const server = require('live-server');


function summoner() {
  const serverParams = {
    port: 9990,
    host: 'http://127.0.0.1',
    open: false,
    // root: '<$MATCHER_PATH>',
  };
  const instance = setup;
  instance(serverParams);
  invoke(serverParams);
  // eslint-disable-next-line no-invalid-this
  const {summon: self} = this;
  return self;
};

const setup = () => {
  server.start;
};

async function invoke({host, port}) {
  const browser = await puppeteer.launch(
      {args: ['--no-sandbox', '--headless', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(`${host}:${port}`);
  // do something
  await browser.close();
}

exports.summon = summoner;
