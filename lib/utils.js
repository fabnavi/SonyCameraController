'use strict';
const Constants = require('./constant');
const TYPE = Constants.TYPE;

let Utils = {};
Utils.wait = function(duration){
  console.log("Wating ", duration, " ms...");
  this.core.push({
    type : TYPE.UTIL,
    version :  null,
    fn : () => {
      this.logger.log("Waiting");
    }
  });
}

Utils.cond = function(test){

}

Utils.loop = function(test, work){

}

module.exports = Utils;
