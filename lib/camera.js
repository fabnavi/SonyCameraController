'use strict';
let API = require('./api');
let Utils = require('./utils');
let Logger = require('./logger');
let logger = new Logger({});
let Core = require('./core');
let core = new Core();

function Camera(config){
  let address = config.address;
  let port = config.port;
  this.core = core;
  this.logger = logger;
  this.core.logger = logger;
}

Object.assign(Camera.prototype, API, Utils);

module.exports = Camera;
