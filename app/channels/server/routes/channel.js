'use strict';

var channels = require('../controllers/channel');

module.exports = function(app) {

  app.route('/api/channels')
    .get(channels.all)
    .post(channels.create);

  app.route('/api/channels/:channelId')
    .get(channels.get);

  app.param('channelId', channels.channel);
};
