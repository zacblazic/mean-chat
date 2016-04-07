'use strict';

angular.module('app.users')
  .controller('AuthCtrl', ['$state', 'auth', function($state, auth) {
    var self = this;

    self.user = {};

    self.register = function() {
      auth.register(self.user).error(function(error) {
        self.error = error;
      }).then(function() {
        $state.go('home');
      });
    };

    self.login = function() {
      auth.login(self.user).error(function(error) {
        self.error = error;
      }).then(function() {
        $state.go('home');
      });
    };

  }])
  .controller('NavCtrl', [
    '$scope',
    'auth',
    function($scope, auth){

      $scope.isLoggedIn = auth.authenticated;
      $scope.currentUser = auth.currentUser();
      $scope.logOut = auth.logout;
    }]);
