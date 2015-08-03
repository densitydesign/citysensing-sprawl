'use strict';

/**
 * @ngdoc overview
 * @name cssprawlApp
 * @description
 * # cssprawlApp
 *
 * Main module of the application.
 */
angular
  .module('cssprawlApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/networkcity', {
        templateUrl: 'views/networkcity.html',
        controller: 'NetworkcityCtrl'
      })
      .when('/geocity', {
        templateUrl: 'views/geocity.html',
        controller: 'GeocityCtrl',
        resolve:{
          grid : function (apiservice) {
            return apiservice.getFile('data/grid_milan_topo.json')
          }
        }
      })
      .when('/geoexpo', {
        templateUrl: 'views/geoexpo.html',
        controller: 'GeoexpoCtrl',
        resolve:{
          pavillions : function (apiservice) {
            return apiservice.getFile('data/expoarea_topo.json')
          }
        }
      })
      .when('/networkexpo', {
        templateUrl: 'views/networkexpo.html',
        controller: 'NetworkexpoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
