'use strict';

module.exports = function(app) {
  var index = require('../controllers/index.js');

  app.route('/').get(index.render);
};
