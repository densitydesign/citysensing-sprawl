'use strict';

/**
 * @ngdoc directive
 * @name cssprawlApp.directive:timelinetweets
 * @description
 * # timelinetweets
 */
angular.module('cssprawlApp')
  .directive('timelinetweets', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var stackedTweet = cssprawl.stackedArea()
                          .width(element.width())
                          .height(element.height())
                          .stackColors(["#0EA789", "#0EA789"])

        var chartTweet = d3.select(element[0])

        scope.$watch('socialTimeline.startDate', function(newValue, oldValue){
          if(newValue != oldValue && newValue){
            scope.socialTimeline.timeline.sort(function(a,b){
               return d3.ascending(a.date, b.date)
            })
            var chartData = [{"key":"number of tweets", "values":scope.socialTimeline.timeline}];
            chartTweet.datum(chartData)
              .call(stackedTweet
                .brushDate(newValue)
                .startDate(scope.socialTimeline.startDate)
                .endDate(scope.socialTimeline.endDate)
              )

          }
        })

        scope.$watch('panelDate', function(newValue, oldValue){
            if(newValue != oldValue && newValue){
              var range = d3.time.minute.offset(newValue,scope.timeoffset)
              chartTweet.call(stackedTweet.brushDate(range))
            }
        })

      }
    };
  });
