'use strict';

/**
 * @ngdoc directive
 * @name cssprawlApp.directive:timelineinstagram
 * @description
 * # timelineinstagram
 */
angular.module('cssprawlApp')
  .directive('timelineinstagram', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var stackedInstagram = cssprawl.stackedArea()
                          .width(element.width())
                          .height(element.height())
                          .stackColors(["#488fc5", "#488fc5"])

        var chartInstagram = d3.select(element[0])

        scope.$watch('instagramTimeline.startDate', function(newValue, oldValue){
          if(newValue != oldValue && newValue){
            scope.instagramTimeline.timeline.sort(function(a,b){
               return d3.ascending(a.date, b.date)
            })
            var chartData = [{"key":"number of Instagram posts", "values":scope.instagramTimeline.timeline}];
            chartInstagram.datum(chartData).call(
              stackedInstagram.brushDate(newValue)
              .startDate(scope.instagramTimeline.startDate)
              .endDate(scope.instagramTimeline.endDate)
            )
          }
        })

        scope.$watch('startDate', function(newValue, oldValue){
            if(newValue != oldValue && newValue){
              chartInstagram.call(stackedInstagram.brushDate(newValue))
            }
        })

      }
    };
  });
