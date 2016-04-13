'use strict';
let CameraAPI = {};
const Constants = require('./constant');
const TYPE = Constants.TYPE;
const PARAMS = Constants.PARAMS;

CameraAPI.getShootMode = function(){
  this.core.push({
    version : "1.1",
    type : TYPE.COMMAND,
    method : "getShootMode",
    endpoint : "camera",
    paramsType : null,
    params : null 
  });
}

CameraAPI.setShootMode = function(param){
  this.core.push({
    version : "1.1",
    type : TYPE.COMMAND,
    method : "getShootMode",
    endpoint : "camera",
    paramsType : PARAMS.SHOOT_MODE,
    params : param 
  });
}
CameraAPI.execute = function(){
  this.core.execute();
}

module.exports = CameraAPI;
