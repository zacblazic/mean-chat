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
            requireNoAuth: ['$state', 'auth', function($state, auth) {
              return auth.authenticated().then(function() {
                $state.go('home');
              }, function(err) {
                return err;
              }
            )}]
          }
        })
        .state('register', {
          url: '/register',
          templateUrl: 'app/users/client/views/register.html',
          controller: 'AuthCtrl as authCtrl',
          resolve: {
            requireNoAuth: ['$state', 'auth', function($state, auth) {
              return auth.authenticated().then(function() {
                $state.go('home');
              }, function(err) {
                return err;
              }
            )}]
          }
        })
        .state('profile', {
          url: '/profile',
          templateUrl: 'app/users/client/views/profile.html',
          controller: 'ProfileCtrl as profileCtrl',
          resolve: {
            user: ['auth', 'Users', function(auth, Users) {
              return Users.get({ userId: auth.currentUser().id });
            }]
          }
        });

      $urlRouterProvider.otherwise('/');
  }]);
