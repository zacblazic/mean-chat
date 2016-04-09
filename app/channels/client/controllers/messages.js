'use strict';

angular.module('app.channels')
  .controller('MessagesCtrl', ['ChannelMessages', 'Socket', 'Users', 'channel', 'messages', 'user', function(ChannelMessages, Socket, Users, channel, messages, user) {
      var self = this;
      self.messages = messages;
      self.channelName = channel.name;
      self.channel = channel;

      Socket.emit('joined channel', {
        channelId: self.channel._id
      });

      Socket.on('message', function(message) {
        if (message.channel == self.channel._id) {
          self.messages.push(message);
        }

      });

      self.message = '';
      self.sendMessage = function() {

        var message = {
          user: user._id,
          body: self.message,
          channel: channel._id
        };


        ChannelMessages.save({
          channelId: channel._id
        }, {
          user: user._id,
          body: self.message
        }, function(data) {

          Users.get({ userId: message.user }, function(user) {

            message.user = user;
            message.created = Date.now();

            self.messages.push(message);
            Socket.emit('message', message);

          });


          self.message = '';
        });
      };

    }]);
