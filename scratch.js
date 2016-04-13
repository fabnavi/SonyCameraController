'use strict';
const axios = require('axios');
const version = "1.0";
const errors = {
  "0" : "OK",
  "1" : "Any",
  "2" : "Timeout",
  "3" : "Illegal Argument",
  "4" : "Illegal Data Format",
  "5" : "Illegal Request",
  "6" : "Illegal Response",
  "7" : "Illegal State",
  "8" : "Illegal Type",
  "9" : "Index Out Of Bounds",
  "10" : "No Such Element",
  "11" : "No Such Field",
  "12" : "No Such Method",
  "13" : "Null Pointer",
  "14" : "Unsupported Version",
  "15" : "Unsupported Operation",
  "40400" : "Shooting fail",
  "40401" : "Camera Not Ready",
  "40402" : "Already Running Polling Api",
  "40403" : "Still Capturing Not Finished",
  "41003" : "Some content could not be deleted",
  "401" : "Unauthorized",
  "403" : "Forbidden",
  "404" : "Not Found",
  "406" : "Not Acceptable",
  "413" : "Request Entity Too Large",
  "414" : "Request-URI Too Long",
  "501" : "Not Implemented",
  "503" : "Service Unavailable",
};

var id = 2;
var loc = "192.168.122.1:8080/sony/";
//var loc = "10.0.0.1:10000/sony/";

function execute(method, params,id, version, path){

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

function post(method, params, ver, url){
  return () => {
    id = id + 1;
    return execute(method, params , id, ver ? ver : version, url)
  }
}

function wait(ms){
  return () => {
    let p = new Promise((resolve, reject)=>{
      console.log(`${Date()} -- waiting... ${ms}`);
      setTimeout(()=>{resolve()},ms);
    });
    return p; 
  }
}

function cameraStatus(){
  return ()=>{(new Promise((resolve, reject)=>{
    id = id + 1;
    return execute("getEvent", true, id,  "1.1").then((res)=>{
        if(arg != undefined){
          console.log(res.data.result[arg], "\n"); 
        } else {
          for(var i = 0; i < res.data.result.length; i++){
            let result = res.data.result[i];
            console.log(result);
            if(typeof(result) == "object" && result.hasOwnProperty('cameraStatus')){
              console.log(result.cameraStatus);
            }
          }
        }
    })
  }));
  }
}

function getEvent(ver, params, arg){
  return (new Promise((resolve, reject)=>{
    id = id + 1;
    return execute("getEvent", params , id,  ver).then((res)=>{
        if(arg != undefined){
          console.log(res.data.result[arg], "\n"); 
        } else {
          for(var i = 0; i < res.data.result.length; i++){
            if(res.data.result[i] == null || res.data.result[i] == []){
              continue;
            }
            console.log("#",i,res.data.result[i], "\n"); 
          }
        }
    })
  }));
}

  execute("setShootMode","movie", id, version)
  //.then(getEvent("1.2",true))
  .then(post("startMovieRec"))
  //.then(getEvent("1.2",true))
  .then(wait(1000))
  .then(post("stopMovieRec"))
  .then(post("getEvent",true,"1.1"))
  .then((res)=>{
  return new Promise((resolve, reject)=>{
  console.log(res.data.result, "\n"); 
  resolve(res);
    });
  })
  .then(post("getEvent",true,"1.1"))
  .then((res)=>{
  return new Promise((resolve, reject)=>{
  console.log(res.data.result, "\n"); 
  resolve(res);
    });
  })
  .then(post("getEvent",true,"1.1"))
  .then((res)=>{
  return new Promise((resolve, reject)=>{
  console.log(res.data.result, "\n"); 
  resolve(res);
    });
  })
  .then(post("getCameraFunction"))
  .then(wait(1000))
  .then(post("setCameraFunction","Contents Transfer"))
  .then(post("getSourceList", {"scheme":"storage"}, "1.0", "avContent"))
  .then(post("getSourceList", {"uri":"storage:memoryCard1","targget":"all","view":"date"}, "1.0", "avContent"))
  .then(post("getContentList", {"scheme":"storage"}, "1.0", "avContent"))
  //
  /*
     execute("setShootMode","movie", id, version)
     .then(wait(1000))
     .then(post("getShootMode",null))
     .then(post("actTakePicture",null))
     .then(post("getSupportedShootMode",null))
     .then(post("getAvailableShootMode",null))
     .then(post("getEvent",true,"1.2"))
     .then((res)=>{
     return new Promise((resolve, reject)=>{
  //console.log(res.data.result[1]["cameraStatus"], "\n"); 
  console.log(res.data.result, "\n"); 
  resolve(res);
  });
  })
  .then(wait(1000))
  .then(post("startMovieRec"))
  .then(wait(1000))
  .then(post("stopMovieRec"))
  .then(post("setCameraFunction","Contents Transfer","1.1"))
  .then(post("getEvent",true,"1.1"))
  .then((res)=>{
  return new Promise((resolve, reject)=>{
  console.log(res.data.result[1]["cameraStatus"], "\n"); 
  resolve(res);
  });
  })
  */
  .catch((err)=>{

    console.log("---------------------------------------------------");
    console.log(err);  
    console.log("---------------------------------------------------");
    if(errors.hasOwnProperty(err.data.error[0])){
      console.error(`Error : ${errors[err.data.error[0]]} `);
    } else {
      console.error("unhandled error");
    }

  });
