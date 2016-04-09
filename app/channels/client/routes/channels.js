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
            user: ['$state', 'auth', 'Users', function($state, auth, Users) {
              return Users.get({ userId: auth.currentUser().id }, function(user) {
                if (!user.displayName) {
                  $state.go('profile');
                }
              })
            }],
            channels: ['Channels', function(Channels) {
              return Channels.query();
            }],
            users: ['Users', function(Users) {
              return Users.query();
            }]
          }
        })
        .state('channels.create', {
          url: '/create',
          templateUrl: 'app/channels/client/views/create.html',
          controller: 'ChannelsCtrl as channelsCtrl'
        })
        .state('channels.messages', {
          url: '/{channelId}/messages',
          templateUrl: 'app/channels/client/views/messages.html',
          controller: 'MessagesCtrl as messagesCtrl',
          resolve: {
            messages: ['$stateParams', 'ChannelMessages',
              function($stateParams, ChannelMessages) {
                return ChannelMessages.query({ channelId: $stateParams.channelId });
            }],
            channel: ['$stateParams', 'Channels',
              function($stateParams, Channels) {
                return Channels.get({ channelId: $stateParams.channelId }).$promise;
            }],
            user: ['auth', 'Users', function(auth, Users) {
              return Users.get({ userId: auth.currentUser().id });
            }]
          }
        });
  }]);
