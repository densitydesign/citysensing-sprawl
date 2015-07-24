'use strict';

/**
 * @ngdoc function
 * @name cssprawlApp.controller:NetworkCtrl
 * @description
 * # NetworkCtrl
 * Controller of the cssprawlApp
 */
angular.module('cssprawlApp')
  .controller('NetworkCtrl', function ($scope, apiservice,$rootScope,$timeout) {


//get the data!
    $scope.getNetData = function(date) {
      var endDate = d3.time.minute.offset(date,15);
      var params = {startDate:date.getTime(),endDate:endDate.getTime()};
      apiservice.getCityNetworkGraph(params).then(function(d){
        $scope.netData = d;

      })
    };

    $scope.getTopData = function(date) {
      var endDate = d3.time.minute.offset(date,15);
      var params = {startDate:date.getTime(),endDate:endDate.getTime()};
      apiservice.getCityNetworkUsers(params).then(function(d){
        $scope.topData = d;
        $timeout(function() {$scope.start = endDate; $scope.getTopData(endDate); $scope.getNetData(endDate)},10000);
      })
    };



    //get monday of previous week
    var today = d3.time.week(d3.time.day(new Date()));
    $scope.start = d3.time.day.offset(d3.time.week.offset(today,-1),10);

    $scope.getNetData($scope.start);
    $scope.getTopData($scope.start);










  });
