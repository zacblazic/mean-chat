'use strict';

angular.module('app.users')
  .controller('ProfileCtrl', ['$state', 'user', function($state, user) {
    var self = this;
    self.user = user;

    self.save = function() {
      self.user.$save(function(data) {
        $state.go('home');
      });
    };
  }]);
