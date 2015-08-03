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
    return function (input, pavilions_topo) {
      var output;
      var pavillions = topojson.feature(pavilions_topo, pavilions_topo.objects.expoarea);
      var venue = pavillions.features
        .filter(function(d){return input == d.properties.id})

      output = venue[0].properties.name_panel;
      return output;
    };
  });
