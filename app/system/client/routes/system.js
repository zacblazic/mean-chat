'use strict';

angular.module('app.system')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider.state('home', {
        url: '/',
        templateUrl: 'app/system/client/views/index.html',
        resolve: {
          requireNoAuth: ['$state', 'auth', function($state, auth) {
            return auth.authenticated().then(function() {
              return $state.go('channels');
            }, function(err) {
              return err;
            }
          )}]
        }
      });

      $urlRouterProvider.otherwise('/');

  }]);
