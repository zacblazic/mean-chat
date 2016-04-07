'use strict';

angular.module('app.users')
  .factory('auth', ['$http', '$window', function($http, $window) {
      var auth = {};

      auth.saveToken = function(token) {
        $window.localStorage['app-token'] = token;
      };

      auth.getToken = function() {
        return $window.localStorage['app-token'];
      };

      auth.authenticated = function() {
        var token = auth.getToken();
        if (token) {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          return payload.expiration > Date.now() / 1000;
        } else {
          return false;
        }
      };

      auth.currentUser = function() {
        if (auth.authenticated()) {
          var token = auth.getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));

          return payload.username;
        }
      };

      auth.register = function(user) {
        return $http.post('/register', user).success(function(data) {
          auth.saveToken(data.token);
        });
      };

      auth.login = function(user) {
        return $http.post('/login', user).success(function(data) {
          auth.saveToken(data.token);
        });
      };

      auth.logout = function() {
        $window.localStorage.removeItem('app-token');
      };

      return auth;
  }]);
