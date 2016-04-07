'use strict';

angular.module('app.system', []);
angular.module('app.users', []);

angular.module('app', [
  'ngResource',
  'ui.router',
  'app.system',
  'app.users']);
