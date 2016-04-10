'use strict';

angular.module('app.channels')
  .controller('MessagesCtrl', ['$scope', 'ChannelMessages', 'Socket', 'Users', 'channel', 'messages', 'user', function($scope, ChannelMessages, Socket, Users, channel, messages, user) {
      var self = this;
      self.messages = messages;
      self.channelName = '# ' + channel.name;
      self.channel = channel;
      self.channels = $scope.channelsCtrl.channels;

      // Remove listenters that we may be subscribed to previously
      Socket.removeListener();

      Socket.on('message', function(message) {
        if (message.channel == self.channel._id) {
          self.messages.push(message);
        } else {
          for (var i = 0; i < self.channels.length; i++) {
            var channel = self.channels[i];
            if (channel._id == message.channel) {
              channel.messageCount = channel.messageCount !== undefined ? channel.messageCount + 1 : 1;
            }
          }
        }
      });

      self.getCurrentChannel = function() {
        for (var i = 0; i < self.channels.length; i++) {
          var channel = self.channels[i];

          if (channel._id == self.channel._id) {
            return channel;
          }
        }
      };

      var currentChannel = self.getCurrentChannel();
      currentChannel.messageCount = null;

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
