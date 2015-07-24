'use strict';

/**
 * @ngdoc directive
 * @name cssprawlApp.directive:citymap
 * @description
 * # citymap
 */
angular.module('cssprawlApp')
  .directive('citymap', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var grid = topojson.feature(scope.grid, scope.grid.objects.grid_milan);

        var width = element.width(),
            height = element.height(),
            projection = d3.geo.mercator(),
            path = d3.geo.path().projection(projection),
            b = path.bounds(grid),
            s = 100 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [width/ 2, height / 2];

        s = s+50000; //to be fixed
        projection.scale(s).translate(t).center([9.1733, 45.4597])


        var map = cssprawl.map()
                    .width(width)
                    .height(height)
                    .projection(projection)

        var chartMap = d3.select(element[0]).call(map)

        var mask = cssprawl.mask()
                    .width(width)
                    .height(height)
                    .projection(projection)

        var chartMask = d3.select(element[0])

        chartMask.datum(scope.maskJson).call(mask)

        var citypixel = cssprawl.citypixel()
                    .width(width)
                    .height(height)
                    .projection(projection)

        var chartCitypixel = d3.select(element[0])

        var tweet = cssprawl.tweet()
                    .width(width)
                    .height(height)
                    .projection(projection)

        var chartTweet = d3.select(element[0])

        scope.$watch('[socialActivity.startDate,anomaly.startDate]', function(newValue, oldValue){
          if(newValue[0] == newValue[1] && newValue[0] && newValue[1]){

            scope.socialActivity.cells.forEach(function(d){
              var geometry = scope.grid.objects.grid_milan.geometries
                .filter(function(e){ return d.cellId == e.properties.id})
              if(geometry.length){
                geometry[0].properties.socialActivity = d.value
              }
            })

            var tweetsAcitve = topojson.feature(
              scope.grid,
              scope.grid.objects.grid_milan
            );

            console.log(d3.geo.centroid(tweetsAcitve))

            tweetsAcitve.features = tweetsAcitve.features.filter(function(d){
              return d.properties.socialActivity
            })

            var circleActive = {
              "type": "FeatureCollection",
              "features": tweetsAcitve.features.map(function(d){
                var feature = turf.centroid(d)
                feature.properties = d.properties
                return feature
              })
            };

            scope.anomaly.cells.forEach(function(d){
              var geometry = scope.grid.objects.grid_milan.geometries
                .filter(function(e){ return d.cellId == e.properties.id})

              if(geometry.length){
                geometry[0].properties.anomaly = d.value
              }

            })

            var gridAcitve = topojson.feature(
              scope.grid,
              scope.grid.objects.grid_milan
            );

            gridAcitve.features = gridAcitve.features.filter(function(d){
              return d.properties.anomaly
            })

            var fu = topojson.merge(
              scope.grid,
              scope.grid.objects.grid_milan.geometries.filter(function(d){return !d.properties.anomaly})
            );

            fu.properties = {
              anomaly : 0,
              id : 'inactive'
            }

            gridAcitve.features.push(fu)

            chartCitypixel.datum(gridAcitve).call(citypixel)
            chartTweet.datum(circleActive).call(tweet)

          }
        })
        // scope.$watch('tweetJson', function(newValue, oldValue){
        //   if(newValue != oldValue){
        //     chartTweet.datum(newValue).call(tweet)
        //   }
        // })
        //
        // scope.$watch('districtJson', function(newValue, oldValue){
        //   if(newValue != oldValue){
        //     chartDistrict.datum(newValue).call(district)
        //   }
        // })
      }
    };
  });
