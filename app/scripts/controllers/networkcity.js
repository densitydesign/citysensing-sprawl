'use strict';

/**
 * @ngdoc function
 * @name cssprawlApp.controller:NetworkCtrl
 * @description
 * # NetworkCtrl
 * Controller of the cssprawlApp
 */
angular.module('cssprawlApp')
  .controller('NetworkcityCtrl', function ($scope, apiservice,$rootScope,$timeout, $q, $location) {


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

        var cluster = $scope.netData.nodes
          .filter(function(d){return d.type == 'cluster'})

        if(cluster.length){
          cluster.sort(function(a,b){return d3.descending(a.value,b.value)})
          $scope.topTopic = cluster[0].name;
        }else {
          $scope.topTopic = undefined
        }


        $scope.start = date;

        $timeout(function () {
          // if(endDate.getTime() == d3.time.day.offset($scope.today,7).getTime()){
          //   endDate = scope.today;
          // }
          //$scope.start = endDate;
          $scope.start = d3.time.minute.offset($scope.start,$scope.timeoffset)
          if($scope.start.getTime() == d3.time.day.offset($scope.today,7).getTime()){
            $scope.start = $scope.today;
          }
          $scope.getNetData($scope.start)
        }, 2000);

      })
        .catch(function(error) {
          console.warn(error)
          $scope.topTopic = undefined;
          $timeout(function () {
          // if(endDate.getTime() == d3.time.day.offset($scope.today,7).getTime()){
          //   endDate = scope.today;
          // }
          //$scope.start = endDate;
          $scope.start = d3.time.minute.offset($scope.start,$scope.timeoffset)
          if($scope.start.getTime() == d3.time.day.offset($scope.today,7).getTime()){
            $scope.start = $scope.today;
          }
            $scope.getNetData($scope.start)
          }, 2000);

        });
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

//$scope.today = d3.time.day.floor(new Date());
//$scope.startDate = d3.time.week.offset(d3.time.week.floor($scope.today),-1);

    $scope.today;
    $scope.timeoffset = 15;

    var formatDateParam = d3.time.format('%d-%m-%Y')
    var params = $location.search()
    if(params.startDate){
      $scope.today = formatDateParam.parse(params.startDate)
      //console.log(formatDateParam.parse(params.startDate))

      var test = d3.time.monday.offset(d3.time.monday.floor(new Date()),-1)

    }else{
      $scope.today = d3.time.monday.offset(d3.time.monday.floor(new Date()),-1)
    }

    if(params.timeoffset){
      $scope.timeoffset = parseInt(params.timeoffset);
    }
    //fixed date - to be removed
    //$scope.today = new Date(2015,6,6);
    $scope.start = $scope.today;
    //var first = d3.time.day.offset(d3.time.day(new Date()),-15);
    $scope.topTopic;
    $scope.getNetData($scope.start);
  // $scope.getTopData($scope.start);










  });
