'use strict';

/**
 * @ngdoc directive
 * @name cssprawlApp.directive:citymap
 * @description
 * # citymap
 */
angular.module('cssprawlApp')
  .directive('citymap', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var grid = topojson.feature(scope.grid, scope.grid.objects.grid_milan);

        var width = element.width(),
            height = element.height(),
            projection = d3.geo.mercator(),
            path = d3.geo.path().projection(projection),
            b = path.bounds(grid),
            s = 100 / Math.max((b[1][0] - b[0][0]) / (width+300), (b[1][1] - b[0][1]) / (height+300)),
            t = [width/ 2, height / 2];

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

        var first = true;

        scope.$watch('[socialActivity.startDate,anomaly.startDate,stats.startDate]', function(newValue, oldValue){
          if(newValue[0] == newValue[1] && newValue[1] == newValue[2] && newValue[0] && newValue[1] && newValue[2]){

            scope.panelDate = scope.startDate;

            scope.grid.objects.grid_milan.geometries.forEach(function(d){
              var feature = scope.socialActivity.cells
                .filter(function(e){ return e.cellId == d.properties.id})

              if(feature.length){
                 d.properties.socialActivity = feature[0].value;
              }else {
                delete d.properties.socialActivity;
              }
            })

            var tweetsAcitve = topojson.feature(
              scope.grid,
              scope.grid.objects.grid_milan
            );

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


            scope.grid.objects.grid_milan.geometries.forEach(function(d){
              var feature = scope.anomaly.cells
                .filter(function(e){ return e.cellId == d.properties.id})

              if(feature.length){
                 d.properties.anomaly = feature[0].value;
              }else {
                delete d.properties.anomaly;
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



            $timeout(function() {
              var nextDate;
              // if(first){
              //   nextDate = d3.time.hour.offset(scope.startDate,23);
              //   first = false;
              // }else{
                nextDate = d3.time.minute.offset(scope.startDate,scope.timeoffset);
                if(nextDate.getTime() == d3.time.day.offset(scope.today,7).getTime()){
                  //nextDate = d3.time.week.offset(d3.time.week.floor(scope.today),-1);
                  nextDate = scope.today;
              //  }
                //ok
              }

              if(nextDate.getDate() > scope.startDate.getDate()){
                first = true;
                  scope.getTimeSocialData(nextDate)
                  //scope.getTimeSocialData(nextDate)
                  //scope.getTimeCallsData(nextDate)
              }
              scope.startDate = nextDate;
              scope.getSocialData(scope.startDate);
              scope.getAnomalyData(scope.startDate);
              scope.getStats(scope.startDate);
            },2000);

          }
        })
      }
    };
  });
