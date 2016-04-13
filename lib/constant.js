'use strict';
let mirrorKey = require('mirrorkey');

const TYPE = mirrorKey({
  COMMAND : null,
  UTIL : null,
  SPECIAL : null
});

const PARAMS = {
  SHOOT_MODE : ["still", "movie", "audio", "intervalstill", "looprec"],
  LIVEVIEW_SIZE : ["L", "M"],
  ZOOM_DIRECTION : ["in", "out"],
  ZOOM_MOVEMENT : ["start", "stop", "1shot"],
  ZOOM_SETTING : null,
  TOUCH_AF_POSITION : null,
  MOVIE_FILE_FORMAT : ["MP4", "XAVC S", "XAVC S 4K"],
  MOVIE_QUALITY: ["PS","HQ","STD","VGA", "SLOW","SSLOW","HS120","HS100","HS240","HS200","50M 60p", "50M 50p", "50M 30p", "50M 25p", "50M 24p"],

};
module.exports.TYPE = TYPE;
module.exports.PARAMS = PARAMS;
