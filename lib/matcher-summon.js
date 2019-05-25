"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var puppeteer = require('puppeteer');

var server = require('live-server');

function summoner() {
  var serverParams = {
    port: 9990,
    host: 'http://127.0.0.1',
    open: false // root: '<$MATCHER_PATH>',

  };
  var instance = setup;
  instance(serverParams);
  invoke(serverParams); // eslint-disable-next-line no-invalid-this

  var self = this.summon;
  return self;
}

;

var setup = function setup() {
  server.start;
};

function invoke(_x) {
  return _invoke.apply(this, arguments);
}

function _invoke() {
  _invoke = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var host, port, browser, page;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            host = _ref.host, port = _ref.port;
            _context.next = 3;
            return puppeteer.launch({
              args: ['--no-sandbox', '--headless', '--disable-setuid-sandbox']
            });

          case 3:
            browser = _context.sent;
            _context.next = 6;
            return browser.newPage();

          case 6:
            page = _context.sent;
            _context.next = 9;
            return page["goto"]("".concat(host, ":").concat(port));

          case 9:
            _context.next = 11;
            return browser.close();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _invoke.apply(this, arguments);
}

exports.summon = summoner;