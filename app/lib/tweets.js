(function(){

  var cssprawl = window.cssprawl || (window.cssprawl = {});

  cssprawl.tweet = function(){

    var height = 600,
        width = 600,
        projection,
        minRadius = 5,
        maxRadius = 25,
        duration = 2000,
        dispatch = d3.dispatch("clicked");


    function tweet(selection){
      selection.each(function(data){
        var chart;
        if (selection.select('svg').empty()){
          chart = selection.append('svg')
          .attr('width', width)
          .attr('height', height)
        }
        else
        {
          chart = selection.select('svg')
          .attr('width', width)
          .attr('height', height)
        }

        var path = d3.geo.path()
            .projection(projection)
            //.pointRadius(0)

        var radiusDomain = d3.extent(data.features.map(function(d){return d.properties.socialActivity}))

        var radiusScale = d3.scale.linear()
                            .range([Math.pow(minRadius,2)*Math.PI, Math.pow(maxRadius,2)*Math.PI])
                            .domain(radiusDomain)

        var durationScale = d3.scale.linear()
                              .range([duration,500])
                              .domain(radiusDomain)

        var tweets = chart.selectAll(".tweet").data(data.features, function(d){
          return d.properties.id
        })

        tweets
          .transition()
          .duration(function(d){return durationScale(d.properties.socialActivity)})
          .attr("d", path.pointRadius(function(d){
            return Math.sqrt((radiusScale(d.properties.socialActivity)/Math.PI))
          }))
          .attr("fill-opacity", 0.5)

        tweets
          .enter()
          .append("path")
          .attr("class", "tweet")
          .attr("d", path.pointRadius(0))
          //.attr("d", path.pointRadius(function(d){return Math.sqrt((radiusScale(d.properties.socialActivity)/Math.PI))}))
          .attr("fill", "#0EA789")
          .attr("fill-opacity", 0)
            .transition()
            .duration(function(d){return durationScale(d.properties.socialActivity)})
            .attr("d", path.pointRadius(function(d){return Math.sqrt((radiusScale(d.properties.socialActivity)/Math.PI))}))
            .attr("fill-opacity", 0.5)

        tweets
          .exit()
          .transition()
          .duration(duration*Math.random())
          .attr("d", path.pointRadius(0))
          .attr("fill-opacity", 0)
          .remove()


      }); //end selection
    } // end tweet


  tweet.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return tweet;
  }

  tweet.width = function(x){
    if (!arguments.length) return width;
    width = x;
    return tweet;
  }

  tweet.projection = function(x){
    if (!arguments.length) return projection;
    projection = x;
    return tweet;
  }

  tweet.minRadius = function(x){
    if (!arguments.length) return minRadius;
    minRadius = x;
    return tweet;
  }

  tweet.maxRadius = function(x){
    if (!arguments.length) return maxRadius;
    maxRadius = x;
    return tweet;
  }

  tweet.duration = function(x){
    if (!arguments.length) return duration;
    duration = x;
    return tweet;
  }

  d3.rebind(tweet, dispatch, 'on');

  return tweet;

  }

})();
