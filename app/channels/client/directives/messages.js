'use strict';

angular.module('app.channels')
  .directive('scrollToBottom', [
      function() {
        return {
          restrict: "A",
          link: function(scope, element, attrs) {

            // We dont want to abuse on watch but here it is critical to determine if the parameter has changed.
            scope.$watch(function() {
              return element[0].scrollHeight;
            }, function(newValue, oldValue) {
              element[0].scrollTop = newValue;
            });
          }
        };
      }
    ]);
