'use strict';

var path = require('path');

module.exports.render = function(req, res) {
  res.sendFile(path.resolve('app/system/server/views/index.html'));
};
