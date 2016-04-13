'use strict';

/*
let Client = require('node-ssdp').Client, client = new Client();

client.on('response', (headers, statusCode, rinfo)=> {  
  console.log('got m-search response');
  console.log(headers);
  console.log(rinfo);
});

//client.search('urn:schemas-sony-com:service:ScalarWebAPI:1');
//client.search('ssdp:all');
console.log("searching...");
*/
  var Server = require('node-ssdp').Server
, server = new Server()
  ;

  server.addUSN('urn:schemas-sony-com:service:ScalarWebAPI:1');

  server.on('advertise-alive', function (headers) {
    // Expire old devices from your cache.
    //       // Register advertising device somewhere (as designated in http headers heads)
  });
//
server.on('advertise-bye', function (headers) {
  //                     // Remove specified device from cache.
});
//
//                             // start the server
server.start();
//
process.on('exit', function(){
  server.stop() // advertise shutting down and stop listening
})
