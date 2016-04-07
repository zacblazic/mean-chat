'use strict';

angular.module('app.channels')
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('channels', {
          url: '/channels',
          templateUrl: 'app/channels/client/views/index.html',
          controller: 'ChannelsCtrl as channelsCtrl',
          resolve: {
            user: ['auth', 'Users', function(auth, Users) {
              return Users.get({ userId: auth.currentUser().id });
            }],
            channels: ['Channels', function(Channels) {
              return Channels.query();
            }]
          }
        })
        .state('channels.create', {
          url: '/create',
          templateUrl: 'app/channels/client/views/create.html',
          controller: 'ChannelsCtrl as channelsCtrl'
        });
  }]);
