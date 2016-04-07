'use strict';

angular.module('app.channels')
  .factory('Channels', ['$resource', function($resource) {
    return $resource('api/channels/:channelId', {
      channelId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }]);
