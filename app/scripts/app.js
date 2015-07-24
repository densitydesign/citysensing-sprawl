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
      .when('/network', {
        templateUrl: 'views/network.html',
        controller: 'NetworkCtrl'
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
      .otherwise({
        redirectTo: '/'
      });
  });
