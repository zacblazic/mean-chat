'use strict';

angular.module('app.channels')
  .controller('MessagesCtrl', ['ChannelMessages', 'channel', 'messages', 'user', function(ChannelMessages, channel, messages, user) {
      var self = this;
      this.messages = messages;
      this.channelName = channel.name;

      self.message = '';
      self.sendMessage = function() {
        ChannelMessages.save({
          channelId: channel._id
        }, {
          user: user._id,
          body: self.message
        }, function(data) {
          self.message = '';
        });
      };

    }]);
