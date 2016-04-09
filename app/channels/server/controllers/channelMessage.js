'use strict';

var mongoose = require('mongoose'),
  ChannelMessage = mongoose.model('ChannelMessage'),
  User = mongoose.model('User');

module.exports.all = function(req, res) {
  // Paging would be better, but not for now
  ChannelMessage.find({ channel: req.params.channelId })
  .populate('user', 'displayName emailHash')
  .exec(function(err, messages) {
    if (err) { return res.status(500).json({ error: 'Cannot list messages' }); }
    res.json(messages);
  });
};

module.exports.create = function(req, res) {
  var message = new ChannelMessage(req.body);

  message.channel = req.params.channelId;

  message.save(function(err) {
    if (err) { return res.status(500).json({ error: 'Cannot create channel message' }); }
    res.json(message);
  });
};
