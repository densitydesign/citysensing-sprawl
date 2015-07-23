'use strict';

/**
 * @ngdoc service
 * @name cssprawlApp.apiservice
 * @description
 * # apiservice
 * Factory in the cssprawlApp.
 */
angular.module('cssprawlApp')
  .factory('apiservice', function ($q,$http) {

    var baseUrl = 'http://www.streamreasoning.com/citysensing/api/';

    return {
      getFile : function(url){
        var deferred = $q.defer();
        $http.get(url).success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject("An error occured while fetching file");
        });

        return deferred.promise;
      },
      getGeoCitySocialActivityTimeline : function(params){
         var serviceUrl = 'geo/city/social_activity/timeline';
         var deferred = $q.defer();
         $http({
           method: 'GET',
           url : baseUrl + serviceUrl,
           params : params
         }).success(function(data){
           deferred.resolve(data);
         }).error(function(){
           deferred.reject("An error occured while fetching file");
         });

         return deferred.promise;
       },
       getGeoCityCallsTimeline : function(params){
          var serviceUrl = 'geo/city/calls/timeline';
          var deferred = $q.defer();
          $http({
            method: 'GET',
            url : baseUrl + serviceUrl,
            params : params
          }).success(function(data){
            deferred.resolve(data);
          }).error(function(){
            deferred.reject("An error occured while fetching file");
          });

          return deferred.promise;
        },
       getGeoCityCallsAnomalyCells : function(params){
          var serviceUrl = 'geo/city/calls_anomaly/cells';
          var deferred = $q.defer();
          $http({
            method: 'GET',
            url : baseUrl + serviceUrl,
            params : params
          }).success(function(data){
            deferred.resolve(data);
          }).error(function(){
            deferred.reject("An error occured while fetching file");
          });

          return deferred.promise;
        },
       getGeoCitySocialActivityCells : function(params){
          var serviceUrl = 'geo/city/social_activity/cells';
          var deferred = $q.defer();
          $http({
            method: 'GET',
            url : baseUrl + serviceUrl,
            params : params
          }).success(function(data){
            deferred.resolve(data);
          }).error(function(){
            deferred.reject("An error occured while fetching file");
          });

          return deferred.promise;
        },
        getGeoCityGeneralStats : function(params){
          var serviceUrl = 'geo/city/general_stats';
          var deferred = $q.defer();
          $http({
            method: 'GET',
            url : baseUrl + serviceUrl,
            params : params
          }).success(function(data){
            deferred.resolve(data);
          }).error(function(){
            deferred.reject("An error occured while fetching file");
          });

          return deferred.promise;
        },
        getGeoExpoSocialActivityTimeline : function(params){
           var serviceUrl = 'geo/expo/social_activity/timeline';
           var deferred = $q.defer();
           $http({
             method: 'GET',
             url : baseUrl + serviceUrl,
             params : params
           }).success(function(data){
             deferred.resolve(data);
           }).error(function(){
             deferred.reject("An error occured while fetching file");
           });

           return deferred.promise;
         },
      getCityNetworkGraph : function(params){
        var serviceUrl = 'network/city/graph';
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url : baseUrl + serviceUrl,
          params : params
        }).success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject("An error occured while fetching file");
        });

        return deferred.promise;
      },
      getCityNetworkUsers : function(params){
        var serviceUrl = 'network/city/users';
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url : baseUrl + serviceUrl,
          params : params
        }).success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject("An error occured while fetching file");
        });

        return deferred.promise;
      }
    };
  });
