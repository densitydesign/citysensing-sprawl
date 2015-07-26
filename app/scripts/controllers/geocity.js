'use strict';

/**
 * @ngdoc function
 * @name cssprawlApp.controller:GeocityCtrl
 * @description
 * # GeocityCtrl
 * Controller of the cssprawlApp
 */
angular.module('cssprawlApp')
  .controller('GeocityCtrl', function ($scope, $interval, apiservice, grid) {

      $scope.grid = grid;

      //get monday of previous week
      var today = new Date();
      $scope.startDate = d3.time.week.offset(d3.time.week.floor(today),-2);
      $scope.endDate;

      $scope.socialActivity;
      $scope.anomaly;
      $scope.socialTimeline;
      $scope.callsTimeline;
      $scope.stats;

      $scope.maskJson = topojson.merge($scope.grid, $scope.grid.objects.grid_milan.geometries);
      $scope.maskJson = { "type": "FeatureCollection",
        "features": [$scope.maskJson]
      }

      $scope.getSocialData = function(date) {
        var endDate = d3.time.minute.offset(date,15);
        var params = {startDate:date.getTime(),endDate: endDate.getTime()};

        apiservice.getGeoCitySocialActivityCells(params).then(function(data){

          data.cells = data.cells.filter(function(d){
            return d.cellId >= 0 && d.value > 1;
          })
          $scope.socialActivity = data;
        })
      }

      $scope.getAnomalyData = function(date) {
        var endDate = d3.time.minute.offset(date,15);
        //var params = {startDate:date.getTime()};
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};

        apiservice.getGeoCityCallsAnomalyCells(params).then(function(data){

          data.cells = data.cells.filter(function(d){
            return d.cellId >= 0 && d.value >=0;
          })
          $scope.anomaly = data;
        })
      }

      $scope.getTimeSocialData = function(date) {
        var endDate = d3.time.day.offset(date,1);
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};

        apiservice.getGeoCitySocialActivityTimeline(params).then(function(data){
          $scope.socialTimeline = data;
        })
      }

      $scope.getTimeCallsData = function(date) {
        var endDate = d3.time.day.offset(date,1);
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};
        //var params = {startDate:date.getTime()};

        apiservice.getGeoCityCallsTimeline(params).then(function(data){
          $scope.callsTimeline = data;
        })
      }

      $scope.getStats = function(date) {
        var endDate = d3.time.day.offset(date,1);
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};

        apiservice.getGeoCityGeneralStats(params).then(function(data){
          $scope.stats = data;
          console.log($scope.stats)
        })
      }

      $scope.getTimeSocialData($scope.startDate)
      $scope.getTimeCallsData($scope.startDate)
      $scope.getSocialData($scope.startDate)
      $scope.getAnomalyData($scope.startDate)
      $scope.getStats($scope.startDate)


  });
