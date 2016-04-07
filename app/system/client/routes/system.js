'use strict';

angular.module('app.system', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider.state('home', {
        url: '/',
        templateUrl: 'app/system/client/views/index.html'
      });

      $urlRouterProvider.otherwise('/');

  }]);
