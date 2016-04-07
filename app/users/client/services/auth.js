'use strict';

angular.module('app.users')
  .factory('auth', ['$q', '$http', '$window', function($q, $http, $window) {
      var auth = {};

      auth.saveToken = function(token) {
        $window.localStorage['app-token'] = token;
      };

      auth.getToken = function() {
        return $window.localStorage['app-token'];
      };

      auth.authenticated = function() {
        var deferred = $q.defer();

        var token = auth.getToken();
        if (token) {
          var payload = JSON.parse($window.atob(token.split('.')[1]));
          deferred.resolve(payload.expiration > Date.now() / 1000);
        } else {
          deferred.reject(false);
        }

        return deferred.promise;
      };

      auth.currentUser = function() {
        if (auth.authenticated()) {
          var token = auth.getToken();
          var payload = JSON.parse($window.atob(token.split('.')[1]));

          return payload;
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
