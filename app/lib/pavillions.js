(function(){

  var cssprawl = window.cssprawl || (window.cssprawl = {});

  cssprawl.pavillion = function(){

    var height = 600,
        width = 600,
        projection,
        duration = 2000,
        dispatch = d3.dispatch("clicked");


    function pavillion(selection){
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

        //to change with real data
        var scaleOpacity = d3.scale.linear().range([0.3,0.9])
        var opacityDomain = d3.extent(data.features.map(function(d){
            return d.properties.value
        }));
        scaleOpacity.domain(opacityDomain)

        var pavillions = chart.selectAll(".pavillion").data(data.features, function(d){return d.properties.id})

        pavillions
          .transition()
          .duration(1000)
          .attr("fill-opacity", function(d){return scaleOpacity(d.properties.value)})
          .transition()
          .duration(500)
          .delay(function(d,i){
            return i*50
          })
          .attr("fill-opacity", 0.3)


        pavillions
          .enter().append("path")
          .attr("class", "pavillion")
          .attr("d", path)
          .attr("fill", "#488fc5")
          .attr("fill-opacity", 0)
          .transition()
          .duration(100)
          .delay(function(d,i){
            return 20*i
          })
          .attr("fill-opacity", 0.3)

        // pavillions.exit()
        //   .transition()
        //   .duration(duration)
        //   .attr("fill-opacity", 0)
        //   .remove()

        var pavillionName = chart.selectAll(".pavillionName").data(data.features, function(d){return d.properties.id})

        pavillionName
          .filter(function(d){return scaleOpacity(d.properties.value) > 0.6 })
          .text(function(d){return d.properties.name})
          .transition()
          .duration(100)
          .attr("fill-opacity", 0)
          .attr("y", function(d){return projection(d3.geo.bounds(d)[1])[1]+10})
          .transition()
          .duration(200)
          .attr("fill-opacity", 0.9)
          .attr("y", function(d){return projection(d3.geo.bounds(d)[1])[1]})
          .transition()
          .duration(1000)
          .delay(function(d,i){
            return i*100 + 800
          })
          .attr("fill-opacity", 0)
          .attr("y", function(d){return projection(d3.geo.bounds(d)[1])[1]-50})
          .transition()
          .duration(1)
          .attr("y", function(d){return projection(d3.geo.bounds(d)[1])[1]+10})

        pavillionName
          .enter().append("text")
          .attr("class", "pavillionName")
          .attr("x", function(d){return projection(d3.geo.bounds(d)[1])[0]})
          .attr("y", function(d){return projection(d3.geo.bounds(d)[1])[1]+10})
          .attr("fill", "white")
          .attr("text-anchor","middle")
          .attr("font-family", "'clear_sansregular', sans-serif")
          .attr("font-size", "1.3em")
          .attr("fill-opacity", 0)
          //.filter(function(d){return d.properties.value})
          .filter(function(d){return scaleOpacity(d.properties.value) > 0.6 })
          .text(function(d){return d.properties.name})
          .transition()
          .duration(200)
          .attr("fill-opacity", 0.9)
          .attr("y", function(d){return projection(d3.geo.bounds(d)[1])[1]})
          .transition()
          .duration(1000)
          .delay(function(d,i){
            return i*100 + 800
          })
          .attr("fill-opacity", 0)
          .attr("y", function(d){return projection(d3.geo.bounds(d)[1])[1]-50})

      }); //end selection
    } // end pavillion


  pavillion.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return pavillion;
  }

  pavillion.width = function(x){
    if (!arguments.length) return width;
    width = x;
    return pavillion;
  }

  pavillion.projection = function(x){
    if (!arguments.length) return projection;
    projection = x;
    return pavillion;
  }

  pavillion.duration = function(x){
    if (!arguments.length) return duration;
    duration = x;
    return pavillion;
  }

  d3.rebind(pavillion, dispatch, 'on');

  return pavillion;

  }

})();
