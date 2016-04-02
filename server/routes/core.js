'use strict';

module.exports = function(app) {
  var core = require('../controllers/core.js');

  app.route('/').get(core.renderIndex);
};
