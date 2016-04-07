'use strict';

var mongoose = require('mongoose'),
  Channel = mongoose.model('Channel');

// Get article by id
module.exports.channel = function(req, res, next, id) {
  Channel.findById(id, function(err, channel) {
    if (err) { next(err); }
    if (!channel) { next(new Error('channel not found')); }
    req.channel = channel;
    return next();
  });
};

// Get a channel
module.exports.get = function(req, res) {
  res.json(req.channel);
};

// Get all channels
module.exports.all = function(req, res, next) {
  Channel.find(function(err, channels) {
    if (err) { return res.status(500).json({ error: 'Cannot list channels' }); }
    res.json(channels);
  });
};

// Create a channel
module.exports.create = function(req, res) {
  var channel = new Channel(req.body);

  channel.save(function(err) {
    if (err) { return res.status(500).json({ error: 'Cannot create channel' }); }
    res.json(channel);
  });
};
