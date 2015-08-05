'use strict';

/**
 * @ngdoc function
 * @name cssprawlApp.controller:GeocityCtrl
 * @description
 * # GeocityCtrl
 * Controller of the cssprawlApp
 */
angular.module('cssprawlApp')
  .controller('GeocityCtrl', function ($scope, $interval, $location, apiservice, grid) {

      $scope.grid = grid;
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
      $scope.startDate = $scope.today;
      $scope.panelDate = $scope.today;
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
        var endDate = d3.time.minute.offset(date,$scope.timeoffset);
        var params = {startDate:date.getTime(),endDate: endDate.getTime()};

        apiservice.getGeoCitySocialActivityCells(params).then(
          function(data){
            data.cells = data.cells.filter(function(d){
              return d.cellId >= 0 && d.value > 1;
            })
            $scope.socialActivity = data;
          },
          function(err){
              console.warn(err)
            $scope.socialActivity = {"startDate":params.startDate,"endDate":params.endDate,cells:[]}
          }
        )
      }

      $scope.getAnomalyData = function(date) {
        var endDate = d3.time.minute.offset(date,$scope.timeoffset);
        //var params = {startDate:date.getTime()};
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};

        apiservice.getGeoCityCallsAnomalyCells(params).then(
          function(data){
            data.cells = data.cells.filter(function(d){
              return d.cellId >= 0 && d.value >=0;
            })
            $scope.anomaly = data;
          },
          function(err){
              console.warn(err)
            $scope.anomaly = {"startDate":params.startDate,"endDate":params.endDate,cells:[]}
          }
        )
      }

      $scope.getTimeSocialData = function(date) {
        var endDate = d3.time.day.offset(date,1);
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};

        apiservice.getGeoCitySocialActivityTimeline(params).then(
          function(data){
            $scope.socialTimeline = data;
          },
          function(err){
              console.warn(err)
            $scope.socialTimeline = {"startDate":params.startDate,"endDate":params.endDate,timeline:[]}
          }
          )
      }

      $scope.getTimeCallsData = function(date) {
        var endDate = d3.time.day.offset(date,1);
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};
        //var params = {startDate:date.getTime()};

        apiservice.getGeoCityCallsTimeline(params).then(
          function(data){
            $scope.callsTimeline = data;
          },
          function(err){
              console.warn(err)
            $scope.callsTimeline = {"startDate":params.startDate,"endDate":params.endDate,timeline:[]}
          }
        )
      }

      $scope.getStats = function(date) {
        var endDate = d3.time.minute.offset(date,$scope.timeoffset);
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};

        apiservice.getGeoCityGeneralStats(params).then(
          function(data){
            $scope.stats = data;
          },function(err){
                console.warn(err)
            $scope.stats = {
              "startDate":params.startDate,
              "endDate":params.endDate,
              "totPosts":undefined,
              "topSocialNil":undefined,
              "topSocialCellId":undefined,
              "topAnomalyNil":undefined
            }
          }
        )
      }

      $scope.getTimeSocialData($scope.startDate)
      $scope.getTimeCallsData($scope.startDate)
      $scope.getSocialData($scope.startDate)
      $scope.getAnomalyData($scope.startDate)
      $scope.getStats($scope.startDate)


  });
