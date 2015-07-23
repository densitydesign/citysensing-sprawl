'use strict';

/**
 * @ngdoc directive
 * @name cssprawlApp.directive:topnet
 * @description
 * # topnet
 */
angular.module('cssprawlApp')
  .directive('topnet', function () {
    return {
      templateUrl: 'views/topnet.html',//'<div class="toplist"></div>',
      replace : true,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        scope.$watch("topData",function(newValue,oldValue){
          if(newValue!==oldValue) {
            scope.topUsers = newValue.users;
          }
        });


      }
    };
  });
