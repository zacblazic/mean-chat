'use strict';

angular.module('app.channels')
  .controller('MessagesCtrl', ['ChannelMessages', 'Socket', 'channel', 'messages', 'user', function(ChannelMessages, Socket, channel, messages, user) {
      var self = this;
      this.messages = messages;
      this.channelName = channel.name;

      Socket.on('message', function(message) {
        console.log(message);
        this.messages.push(message);
      });

      self.message = '';
      self.sendMessage = function() {

        var message = {
          user: user._id,
          body: self.message,
          channel: channel._id
        };

        Socket.emit('message', message);

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
