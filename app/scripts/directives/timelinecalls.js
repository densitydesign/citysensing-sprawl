'use strict';

/**
 * @ngdoc directive
 * @name cssprawlApp.directive:timelinecalls
 * @description
 * # timelinecalls
 */
angular.module('cssprawlApp')
  .directive('timelinecalls', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var stackedCalls = cssprawl.stackedArea()
                          .width(element.width())
                          .height(element.height())
                          .stackColors(["#FFE100","#FFE100"])

        var chartCalls = d3.select(element[0])

        scope.$watch('callsTimeline.startDate', function(newValue, oldValue){
          if(newValue != oldValue && newValue){
            var chartData = [{"key":"amount of phone calls", "values":scope.callsTimeline.timeline}];
            chartCalls.datum(chartData)
              .call(
                stackedCalls
                  .brushDate(newValue)
                  .startDate(scope.callsTimeline.startDate)
                  .endDate(scope.callsTimeline.endDate)
              )

          }
        })

        scope.$watch('startDate', function(newValue, oldValue){
            if(newValue != oldValue && newValue){
              chartCalls.call(stackedCalls.brushDate(newValue))
            }
        })

      }
    };
  });
