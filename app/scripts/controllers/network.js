'use strict';

/**
 * @ngdoc function
 * @name cssprawlApp.controller:NetworkCtrl
 * @description
 * # NetworkCtrl
 * Controller of the cssprawlApp
 */
angular.module('cssprawlApp')
  .controller('NetworkCtrl', function ($scope, apiservice,$rootScope) {


//get the data!
    $scope.getNetData = function(date) {
      var params = {startDate:date.getTime() / 1000};
      apiservice.getCityNetworkGraph(params).then(function(d){
        $scope.netData = d;
        console.log($scope.netData);
      })
    };

    $scope.getTopData = function(date) {
      var params = {startDate:date.getTime() / 1000};
      apiservice.getCityNetworkUsers(params).then(function(d){
        $scope.topData = d;
        console.log($scope.topData);
      })
    };



    //get monday of previous week
    var today = d3.time.week(d3.time.day(new Date()));
    $scope.start = d3.time.day.offset(d3.time.week.offset(today,-1),10);

    $scope.getNetData($scope.start);
    $scope.getTopData($scope.start);










  });
