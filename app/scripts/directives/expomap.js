'use strict';

/**
 * @ngdoc directive
 * @name cssprawlApp.directive:expomap
 * @description
 * # expomap
 */
angular.module('cssprawlApp')
  .directive('expomap', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var pavillions = topojson.feature(scope.pavillions, scope.pavillions.objects.expoarea);

        var width = element.width(),
            height = element.height(),
            projection = d3.geo.mercator(),
            path = d3.geo.path().projection(projection),
            b = path.bounds(pavillions),
            s = 100 / Math.max((b[1][0] - b[0][0]) / (width+500), (b[1][1] - b[0][1]) / (height+500)),
            t = [width/ 2, height / 2];

        var center = d3.geo.centroid(pavillions)
        projection
          .scale(s)
          .translate(t)
          .rotate([-center[0],-center[1],25.2])

        var pavillion = cssprawl.pavillion()
                    .width(width)
                    .height(height)
                    .projection(projection)

        var chartPavillion = d3.select(element[0])
        chartPavillion.datum(pavillions).call(pavillion)

        var post = cssprawl.post()
                    .width(width)
                    .height(height)
                    .projection(projection)

        var chartPost = d3.select(element[0])

        scope.$watch('[socialActivity.startDate,pavillionsActivity.startDate,stats.startDate]', function(newValue, oldValue){
          if(newValue[0] == newValue[1] && newValue[1] == newValue[2] && newValue[0] && newValue[1] && newValue[2]){

            pavillions.features.forEach(function(d){
              var feature = scope.pavillionsActivity.posts.filter(function(e){
                return d.properties.id == e.placeId
              })

              if(feature.length){
                d.properties.value = feature[0].value;
              }else{
                d.properties.value = 0;
              }

            })

            // scope.pavillionsActivity.posts.forEach(function(d){
            //   var feature = pavillions.features.filter(function(e){
            //     return e.properties.id == d.placeId
            //   })
            //
            //   if(feature.length){
            //     feature[0].properties.value = d.value;
            //   }
            // })

            chartPavillion.datum(pavillions).call(pavillion)
            //chartPost.datum(scope.socialActivity).call(post)

            $timeout(function() {
              scope.startDate =  d3.time.minute.offset(scope.startDate,15);
              scope.getSocialData(scope.startDate);
              scope.getPavillionsData(scope.startDate);
              scope.getStats(scope.startDate);
            },5000);

          }
        })
      }
    };
  });
