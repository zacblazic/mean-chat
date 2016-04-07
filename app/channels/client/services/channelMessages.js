'use strict';

angular.module('app.channels')
  .factory('ChannelMessages', ['$resource', function($resource) {
    return $resource('api/channels/:channelId/messages', {
      channelId: '@channelId'
    });
  }]);
