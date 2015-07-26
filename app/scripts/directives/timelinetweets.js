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
            var chartData = [{"key":"number of tweets", "values":scope.socialTimeline.timeline}];
            chartTweet.datum(chartData).call(stackedTweet)
            var brushDate = d3.max(scope.socialTimeline.timeline, function(d){return d.date})
            chartTweet.call(stackedTweet.brushDate(newValue))
          }
        })

        scope.$watch('startDate', function(newValue, oldValue){
            if(newValue != oldValue && newValue){
              chartTweet.call(stackedTweet.brushDate(newValue))
            }
        })

      }
    };
  });
