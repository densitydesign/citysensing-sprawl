'use strict';

/**
 * @ngdoc function
 * @name cssprawlApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cssprawlApp
 */
angular.module('cssprawlApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
