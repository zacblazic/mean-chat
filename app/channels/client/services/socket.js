'use strict';

angular.module('app.channels')
  .factory('Socket', ['socketFactory', function (socketFactory) {
    return socketFactory();
  }]);
