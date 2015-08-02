'use strict';

/**
 * @ngdoc filter
 * @name cssprawlApp.filter:venueName
 * @function
 * @description
 * # venueName
 * Filter in the cssprawlApp.
 */
angular.module('cssprawlApp')
  .filter('venueName', function () {
    return function (input, topojson) {
      var output;
      var venue = topojson.objects.expoarea.geometries
        .filter(function(d){return input == d.id})
      output = venue[0].properties.name_panel;
      return output;
    };
  });
