'use strict';

let Core = function(){
  this.commandQueue = [];
}

Core.prototype.push = function(command){
  this.commandQueue.push(command);
  return true;
};

Core.prototype.execute = function(){
  this.logger.log("Execute : ", this.commandQueue);
  let i = 0;
  for(; i < this.commandQueue.length; i++){
    let command = this.commandQueue[i];
    this.logger.log("Exec::",command);
  }
};

function post(method, params,id, version, path){

  path = path ? path : "camera";
  let p = new Promise(function(resolve,reject){
    let _params = params === false ? [false] : (params === null ? [] : params === undefined ? [] : [params] );
    console.log(`\n${Date()} -- POST ${path}/${method} with ${_params} --- id: ${id}, version: ${version}`);
    axios.post("http://"+loc+"/" + path, {
      "method" : method,
      "params": _params,
      "id": id,
      "version" : version
    }).then((res)=>{
      if(res.data.hasOwnProperty("result")){
        console.log(`${Date()} -- id:${res.data.id} -- ${res.status} -|\n\n     result: ${JSON.stringify(res.data.result)}\n` );  
        //console.log(`${Date()} -- id:${res.data.id} -- ${res.status} -|\n\n     ` );  
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err)=>{
      reject(err);
    });
  });
  return p;
}
module.exports = Core;
