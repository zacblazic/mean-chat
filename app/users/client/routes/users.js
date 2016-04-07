'use strict';

angular.module('app.users')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/users/client/views/login.html',
          controller: 'AuthCtrl as authCtrl',
          resolve: {
            requireNoAuth: function($state, auth) {
              if(auth.authenticated()) {
                $state.go('channels');
              }
            }
          }
        })
        .state('register', {
          url: '/register',
          templateUrl: 'app/users/client/views/register.html',
          controller: 'AuthCtrl as authCtrl',
          resolve: {
            requireNoAuth: function($state, auth) {
              if(auth.authenticated()) {
                $state.go('channels');
              }
            }
          }
        });

      $urlRouterProvider.otherwise('/');
  }]);
