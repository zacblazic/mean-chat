'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ChannelSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'ChannelMessage'
  }],
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Channel', ChannelSchema);
