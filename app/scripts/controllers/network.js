'use strict';

/**
 * @ngdoc function
 * @name cssprawlApp.controller:NetworkCtrl
 * @description
 * # NetworkCtrl
 * Controller of the cssprawlApp
 */
angular.module('cssprawlApp')
  .controller('NetworkCtrl', function ($scope, apiservice,$rootScope,$timeout, $q) {


    var count = 0;


//get the data!
    $scope.getNetData = function(date) {
      var endDate = d3.time.minute.offset(date, 15);
      var params = {startDate: date.getTime(), endDate: endDate.getTime()};

      $q.all([
        apiservice.getCityNetworkGraph(params),
        apiservice.getCityNetworkUsers(params)
      ]).then(function (data) {

        $scope.netData = data[0];
        $scope.topData = data[1];
        $scope.start = date;

        $timeout(function () {
          $scope.start = endDate;
          $scope.getNetData($scope.start)
        }, 1000);

      })
        .catch(function(error) { console.log(error) });
    }

    /*

       apiservice.getCityNetworkGraph(params).then(function(d){
       $scope.netData = d;
       $timeout(function() {
         $scope.start = endDate; $scope.getTopData(endDate); $scope.getNetData(endDate)},1000);

       })
       };
*/
    /*  apiservice.getFile("data/les"+(count%2)+".json").then(function (d) {

        count++;

        $scope.netData = d;
        $timeout(function () {
          $scope.start = endDate;
          //$scope.getTopData(endDate);
          $scope.getNetData(endDate)
        }, 10000);

      })
    };
    */
/*
    $scope.getTopData = function(date) {
      var endDate = d3.time.minute.offset(date,15);
      var params = {startDate:date.getTime(),endDate:endDate.getTime()};
      apiservice.getCityNetworkUsers(params).then(function(d){
        $scope.topData = d;

      })
    };

*/

    //get monday of previous week
    var today = d3.time.week(d3.time.day(new Date()));
    //$scope.start = d3.time.day.offset(d3.time.week.offset(today,-1),-3);
    var first = d3.time.day.offset(d3.time.day(new Date()),-15);

    $scope.getNetData(first);
  // $scope.getTopData($scope.start);










  });
