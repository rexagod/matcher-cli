const puppeteer = require('puppeteer');
const server = require('live-server');


function summoner() {
  const setup = server.start;
  const serverParams = {
    port: 9990,
    host: '127.0.0.1',
    open: false,
    // root: '<$MATCHER_PATH>',
  };
  // const instance = setup;
  // instance(serverParams);
  setup(serverParams); // replace by exec --quiet using npm
  invoke(serverParams);
  // eslint-disable-next-line no-invalid-this
  const {summon: self} = this;
  return self;
};


async function invoke({host, port}) {
  const browser = await puppeteer.launch(
      {args: ['--no-sandbox', '--headless', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(`http://${host}:${port}`);
  // get points etc.
  await browser.close();
}

exports.summon = summoner;
