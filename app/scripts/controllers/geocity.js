'use strict';

/**
 * @ngdoc function
 * @name cssprawlApp.controller:GeocityCtrl
 * @description
 * # GeocityCtrl
 * Controller of the cssprawlApp
 */
angular.module('cssprawlApp')
  .controller('GeocityCtrl', function ($scope, apiservice, grid) {

      $scope.grid = grid;

      //get monday of previous week
      var today = d3.time.week(d3.time.day(new Date()));
      $scope.start = d3.time.day.offset(d3.time.week.offset(today,-1),10);
      $scope.end = d3.time.minute.offset( $scope.start,15);

      $scope.socialActivity;
      $scope.anomaly;

      $scope.maskJson = topojson.merge($scope.grid, $scope.grid.objects.grid_milan.geometries);
      $scope.maskJson = { "type": "FeatureCollection",
        "features": [$scope.maskJson]
      }

      var params = {
        startDate:$scope.start.getTime(),
        endDate:$scope.end.getTime()
      };

      var params2 = {
        startDate:$scope.start.getTime()
      };

      apiservice.getGeoCitySocialActivityCells(params).then(function(data){
        $scope.socialActivity = data;
        $scope.socialActivity.cells = $scope.socialActivity.cells.filter(function(d){
          return d.cellId >= 0 && d.value > 1;
        })
      })

      apiservice.getGeoCityCallsAnomalyCells(params2).then(function(data){
        $scope.anomaly = data;
        $scope.anomaly.cells = $scope.anomaly.cells.filter(function(d){
          return d.cellId >= 0 && d.value >=0;
        })
      })


  });
