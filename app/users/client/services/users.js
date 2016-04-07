'use strict';

angular.module('app.users')
  .factory('Users', ['$resource', function($resource) {

    var Users = $resource('users/:userId', {
        userId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });

    return Users;

  }]);
