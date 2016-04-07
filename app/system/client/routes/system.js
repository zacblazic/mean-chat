'use strict';

angular.module('app.system')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider.state('home', {
        url: '/',
        templateUrl: 'app/system/client/views/index.html'
      });

      $urlRouterProvider.otherwise('/');

  }]);
