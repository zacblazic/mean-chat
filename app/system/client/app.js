'use strict';

angular.module('app.system', []);
angular.module('app.users', []);
angular.module('app.channels', []);

angular.module('app', [
  'ngResource',
  'ui.router',
  // 'btford.socket-io',
  'app.system',
  'app.users',
  'app.channels']);
