'use strict';

angular.module('app.channels')
  .controller('MessagesCtrl', ['$scope', 'ChannelMessages', 'Socket', 'Users', 'channel', 'messages', 'user', 'focus',
    function($scope, ChannelMessages, Socket, Users, channel, messages, user, focus) {
      var self = this;
      self.messages = messages;
      self.channelName = '# ' + channel.name;
      self.channel = channel;
      self.channels = $scope.channelsCtrl.channels;

      focus('message-box');

      // Remove listenters that we may be subscribed to previously
      Socket.removeListener();

      Socket.on('message', function(message) {
        if (message.channel == self.channel._id) {
          self.messages.push(message);
        } else {
          self.incrementMessageCount(message);
        }
      });

      // Had to put this here since removal of listeners was nuking this
      // one from the channels controller
      Socket.on('channel:created', function(channel) {
        self.channels.push(channel);
      });

      self.getCurrentChannel = function() {
        for (var i = 0; i < self.channels.length; i++) {
          var channel = self.channels[i];

          if (channel._id == self.channel._id) {
            return channel;
          }
        }
      };

      self.incrementMessageCount = function(message) {
        for (var i = 0; i < self.channels.length; i++) {
          var channel = self.channels[i];
          if (channel._id == message.channel) {
            channel.messageCount = channel.messageCount !== undefined ?
              channel.messageCount + 1 : 1;
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

            Socket.emit('message', message);
            self.messages.push(message);
          });

          self.message = '';
        });
      };

    }]);
