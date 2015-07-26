(function(){

  var cssprawl = window.cssprawl || (window.cssprawl = {});

  cssprawl.post = function(){

    var height = 600,
        width = 600,
        projection,
        minRadius = 5,
        maxRadius = 25,
        duration = 2000,
        dispatch = d3.dispatch("clicked");


    function post(selection){
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

        // var radiusDomain = d3.extent(data.features.map(function(d){return d.properties.socialActivity}))
        //
        // var radiusScale = d3.scale.linear()
        //                     .range([Math.pow(minRadius,2)*Math.PI, Math.pow(maxRadius,2)*Math.PI])
        //                     .domain(radiusDomain)
        //
        // var durationScale = d3.scale.linear()
        //                       .range([duration,500])
        //                       .domain(radiusDomain)

        var posts = chart.selectAll(".post").data(data.posts)

        // posts
        //   .transition()
        //   .duration(function(d){return durationScale(d.properties.socialActivity)})
        //   .attr("d", path.pointRadius(function(d){
        //     return Math.sqrt((radiusScale(d.properties.socialActivity)/Math.PI))
        //   }))
        //   .attr("fill-opacity", 0.5)

        posts
          .enter()
          .append("circle")
          .attr("class", "post")
          .attr("cx", function(d){return projection([d.lon, d.lat][0])})
          .attr("cy", function(d){return projection([d.lon, d.lat][1])})
          .attr("r", 0)
          .attr("fill", "#0EA789")
          .attr("fill-opacity", 0)
            .transition()
            .duration(duration/Math.random())
            .attr("r", 7)
            .attr("fill-opacity", 0.9)
            .transition()
            .duration(duration/Math.random())
            .attr("r", 10)
            .attr("fill-opacity", 0)
            .remove()

        // posts
        //   .exit()
        //   .transition()
        //   .duration(duration*Math.random())
        //   .attr("d", path.pointRadius(0))
        //   .attr("fill-opacity", 0)
        //   .remove()


      }); //end selection
    } // end post


  post.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return post;
  }

  post.width = function(x){
    if (!arguments.length) return width;
    width = x;
    return post;
  }

  post.projection = function(x){
    if (!arguments.length) return projection;
    projection = x;
    return post;
  }

  post.minRadius = function(x){
    if (!arguments.length) return minRadius;
    minRadius = x;
    return post;
  }

  post.maxRadius = function(x){
    if (!arguments.length) return maxRadius;
    maxRadius = x;
    return post;
  }

  post.duration = function(x){
    if (!arguments.length) return duration;
    duration = x;
    return post;
  }

  d3.rebind(post, dispatch, 'on');

  return post;

  }

})();
