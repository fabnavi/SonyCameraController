'use strict';
const axios = require('axios');
const Camera = require('./lib/camera');
let camera = new Camera({
  address : "192.168.122.1",
  port : 8080
});

camera.getShootMode();
camera.setShootMode("still");
camera.wait(1000);
//camera.setShootMode("still")
camera.wait(1000);

camera.execute();
