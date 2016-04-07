'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ChannelMessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  body: String,
  channel: {
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('ChannelMessage', ChannelMessageSchema);
