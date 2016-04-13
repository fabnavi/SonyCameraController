'use strict';
let Logger = function(config){
  this.logQueue = [];
  this.logLevel = config.level || 2;
  this.enable = config.enable || true;
};

Logger.prototype.log = function(type,msg){
  msg = typeof(msg) == "object" ? JSON.stringify(msg) : msg
 if(!this.enable) return ;
  this.logQueue.push({
    level : "log",
    type : type,
    message : msg
  }); 

  if(this.logLevel >= 1){
    console.log("--LOG--", type, msg);
  }
};

Logger.prototype.error = function(type,msg){
  msg = typeof(msg) == "object" ? JSON.stringify(msg) : msg
 if(!this.enable) return ;
  this.logQueue.push({
    level: "error",
    type : type,
    message : msg
  }); 

  if(this.logLevel >= 0){
    console.log("--ERR--", msg);
  }
}

Logger.prototype.debug = function(type,msg){
  msg = typeof(msg) == "object" ? JSON.stringify(msg) : msg
 if(!this.enable) return ;
  this.logQueue.push({
    level : "debug",
    type : type,
    message : msg
  }); 

  if(this.logLevel >= 2){
    console.log("--DBG--", msg);
  }
}

module.exports = Logger;
