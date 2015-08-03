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

    var baseUrl = 'http://www.streamreasoning.com/citysensing/api2/';

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
           deferred.reject("An error occured while fetching geo/city/social_activity/timeline");
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
            deferred.reject("An error occured while fetching geo/city/calls/timeline");
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
            deferred.reject("An error occured while fetching geo/city/calls_anomaly/cells");
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
            deferred.reject("An error occured while fetching geo/city/social_activity/cells");
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
            deferred.reject("An error occured while fetching geo/city/social_activity/cells");
          });

          return deferred.promise;
        },
        getGeoExpoSocialActivityTimeline : function(params){
           var serviceUrl = 'geo/expo/twitter/timeline';
           var deferred = $q.defer();
           $http({
             method: 'GET',
             url : baseUrl + serviceUrl,
             params : params
           }).success(function(data){
             deferred.resolve(data);
           }).error(function(){
             deferred.reject("An error occured while fetching geo/city/social_activity/cells");
           });

           return deferred.promise;
            },
        getGeoExpoInstagramTimeline : function(params){
            var serviceUrl = 'geo/expo/instagram/timeline';
            var deferred = $q.defer();
            $http({
              method: 'GET',
              url : baseUrl + serviceUrl,
              params : params
            }).success(function(data){
              deferred.resolve(data);
            }).error(function(){
              deferred.reject("An error occured while fetching geo/expo/instagram/timeline");
            });

            return deferred.promise;
          },
        getGeoExpoSocialActivityPosts : function(params){
            var serviceUrl = 'geo/expo/social_activity/geo';
            var deferred = $q.defer();
            $http({
              method: 'GET',
              url : baseUrl + serviceUrl,
              params : params
            }).success(function(data){
              deferred.resolve(data);
            }).error(function(){
              deferred.reject("An error occured while fetching geo/expo/social_activity/geo");
            });

            return deferred.promise;
          },
        getGeoExpoPavillionsActivity : function(params){
            var serviceUrl = 'geo/expo/social_activity/text';
            var deferred = $q.defer();
            $http({
              method: 'GET',
              url : baseUrl + serviceUrl,
              params : params
            }).success(function(data){
              deferred.resolve(data);
            }).error(function(){
              deferred.reject("An error occured while fetching geo/expo/social_activity/text");
            });

            return deferred.promise;
          },
        getGeoExpoGeneralStats : function(params){
            var serviceUrl = 'geo/expo/general_stats';
            var deferred = $q.defer();
            $http({
              method: 'GET',
              url : baseUrl + serviceUrl,
              params : params
            }).success(function(data){
              deferred.resolve(data);
            }).error(function(){
              deferred.reject("An error occured while fetching geo/expo/general_stats");
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
            deferred.reject("An error occured while fetching network/city/graph");
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
            deferred.reject("An error occured while fetching network/city/users");
          });

          return deferred.promise;
        },
        getExpoNetworkGraph : function(params){
          var serviceUrl = 'network/expo/graph';
          var deferred = $q.defer();
          $http({
            method: 'GET',
            url : baseUrl + serviceUrl,
            params : params
          }).success(function(data){
            deferred.resolve(data);
          }).error(function(){
            deferred.reject("An error occured while fetching network/expo/graph");
          });

          return deferred.promise;
        },
        getExpoNetworkUsers : function(params){
          var serviceUrl = 'network/expo/users';
          var deferred = $q.defer();
          $http({
            method: 'GET',
            url : baseUrl + serviceUrl,
            params : params
          }).success(function(data){
            deferred.resolve(data);
          }).error(function(){
            deferred.reject("An error occured while fetching network/expo/users");
          });

          return deferred.promise;
        }
    };
  });
