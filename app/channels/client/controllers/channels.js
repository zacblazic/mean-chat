'use strict';

angular.module('app.channels')
  .controller('ChannelsCtrl', ['$state', 'Channels', 'Users', 'auth', 'channels', 'user',
    function($state, Channels, Users, auth, channels, user) {
      var self = this;

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
        }, function(data) {
          self.newChannel.name = '';
        });
      };

  }]);
