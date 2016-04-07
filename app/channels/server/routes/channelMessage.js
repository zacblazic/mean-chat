'use strict';

var channelMessages = require('../controllers/channelMessage');

module.exports = function(app) {

  app.route('/api/channels/:channelId/messages')
    .get(channelMessages.all)
    .post(channelMessages.create);
};
