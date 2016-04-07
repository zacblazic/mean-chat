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
                $state.go('home');
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
                console.log('test');
                $state.go('home');
              }
            }
          }
        })
        .state('profile', {
          url: '/profile',
          templateUrl: 'app/users/client/views/profile.html',
          controller: 'ProfileCtrl as profileCtrl',
          resolve: {
            user: ['auth', 'User', function(auth, User) {
              return User.get({ id: auth.currentUser().id });
            }]
          }
        });

      $urlRouterProvider.otherwise('/');
  }]);
