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
            s = 100 / Math.max((b[1][0] - b[0][0]) / (width+1000), (b[1][1] - b[0][1]) / (height+1000)),
            t = [width/ 2, height / 2];

        var center = d3.geo.centroid(pavillions)
        projection
          .scale(s)
          .translate(t)
          .rotate([-center[0]+0.002,-center[1],25.2])

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

        var first = true;

        scope.$watch('[socialActivity.startDate,pavillionsActivity.startDate,stats.startDate]', function(newValue, oldValue){
          if(newValue[0] == newValue[1] && newValue[1] == newValue[2] && newValue[0] && newValue[1] && newValue[2]){

            scope.panelDate = scope.startDate;

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

            chartPavillion.datum(pavillions).call(pavillion)
            chartPost.datum(scope.socialActivity).call(post)

            $timeout(function() {
              var nextDate;
              if(first){
                nextDate = d3.time.hour.offset(scope.startDate,23);
                first = false;
              }else{
                nextDate = d3.time.minute.offset(scope.startDate,15);
                if(nextDate.getTime() == d3.time.day.offset(scope.today,7).getTime()){
                  //nextDate = d3.time.week.offset(d3.time.week.floor(scope.today),-1);
                  nextDate = scope.today;
                }
                //ok
              }
              if(scope.startDate.getDay() != nextDate.getDay()){
                first = true;
                  scope.getTimeSocialData(nextDate)
                  scope.getTimeInstagramData(nextDate)
              }
              scope.startDate = nextDate;
              //scope.startDate =  d3.time.minute.offset(scope.startDate,15);
              scope.getSocialData(scope.startDate);
              scope.getPavillionsData(scope.startDate);
              scope.getStats(scope.startDate);
            },2000);

          }
        })
      }
    };
  });
