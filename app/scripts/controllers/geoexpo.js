'use strict';

/**
 * @ngdoc function
 * @name cssprawlApp.controller:GeoexpoCtrl
 * @description
 * # GeoexpoCtrl
 * Controller of the cssprawlApp
 */
angular.module('cssprawlApp')
  .controller('GeoexpoCtrl', function ($scope, apiservice, pavillions) {

      $scope.pavillions = pavillions;

      //get monday of previous week
      var today = new Date();
      //$scope.startDate = d3.time.week.offset(d3.time.week.floor(today),-2);
      $scope.startDate = d3.time.day.offset(d3.time.day.floor(today),-1);
      $scope.endDate;

      $scope.socialActivity;
      $scope.pavillionsActivity;
      $scope.socialTimeline;
      $scope.instagramTimeline;
      $scope.stats;

      $scope.getSocialData = function(date) {
        var endDate = d3.time.minute.offset(date,15);
        var params = {startDate:date.getTime(),endDate: endDate.getTime()};

        apiservice.getGeoExpoSocialActivityPosts(params).then(function(data){

          $scope.socialActivity = data;


        })
      }

      $scope.getPavillionsData = function(date) {
        var endDate = d3.time.minute.offset(date,15);
        //var params = {startDate:date.getTime()};
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};

        apiservice.getGeoExpoPavillionsActivity(params).then(function(data){
          $scope.pavillionsActivity = data;
        })
      }

      $scope.getTimeSocialData = function(date) {
        var endDate = d3.time.day.offset(date,1);
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};

        apiservice.getGeoExpoSocialActivityTimeline(params).then(function(data){
          $scope.socialTimeline = data;
        })
      }

      $scope.getTimeInstagramData = function(date) {
        var endDate = d3.time.day.offset(date,1);
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};
        //var params = {startDate:date.getTime()};

        apiservice.getGeoExpoInstagramTimeline(params).then(function(data){
          $scope.instagramTimeline = data;
        })
      }

      $scope.getStats = function(date) {
        var endDate = d3.time.day.offset(date,1);
        var params = {startDate:date.getTime(), endDate:endDate.getTime()};

        apiservice.getGeoExpoGeneralStats(params).then(function(data){
          $scope.stats = data;
        })
      }

      $scope.getTimeSocialData($scope.startDate)
      $scope.getTimeInstagramData($scope.startDate)
      $scope.getSocialData($scope.startDate)
      $scope.getPavillionsData($scope.startDate)
      $scope.getStats($scope.startDate)


  });
