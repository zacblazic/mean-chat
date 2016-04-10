'use strict';

angular.module('app.channels')
  .controller('ChannelsCtrl', ['$state', 'Socket', 'Channels', 'Users', 'auth', 'users', 'channels', 'user',
    function($state, Socket, Channels, Users, auth, users, channels, user) {
      var self = this;

      self.users = users;
      self.channels = channels;
      self.user = user;
      self.getGravatar = function(user) {
        return '//www.gravatar.com/avatar/' + user.emailHash;
      };

      self.newChannel = {
        name: ''
      };

      self.logout = function() {
        auth.logout();
        $state.go('home');
      };

      self.createChannel = function() {
        Channels.save({
          name: self.newChannel.name
        }, function(channel) {
          Socket.emit('channel:created', channel);
          self.channels.push(channel);
          self.newChannel.name = '';
        });
      };

  }]);
