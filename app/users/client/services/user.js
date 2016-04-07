'use strict';

angular.module('app.users')
  .factory('User', ['$resource', function($resource) {
      return $resource('users/:id', { id: '@_id' });
    }]);
