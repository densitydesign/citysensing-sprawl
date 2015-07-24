(function(){

  var cssprawl = window.cssprawl || (window.cssprawl = {});

  cssprawl.citypixel = function(){

    var height = 600,
        width = 600,
        projection,
        duration = 2000,
        dispatch = d3.dispatch("clicked");


    function citypixel(selection){
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
        var scaleOpacity = d3.scale.linear().range([0.9,0])
        var opacityDomain = d3.extent(data.features.map(function(d){
            return d.properties.anomaly
        }));
        scaleOpacity.domain(opacityDomain)

        var citypixels = chart.selectAll(".citypixel").data(data.features, function(d){return d.properties.id})

        citypixels
          .transition()
          .duration(duration)
          .attr("fill-opacity", function(d){return scaleOpacity(d.properties.anomaly)})

        citypixels
          .enter().append("path")
          .attr("class", "citypixel")
          .attr("d", path)
          .attr("fill", "black")
          .attr("fill-opacity", 0)
          .transition()
          .duration(duration)
          .attr("fill-opacity", function(d){
              return scaleOpacity(d.properties.anomaly);
          })

      }); //end selection
    } // end citypixel


  citypixel.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return citypixel;
  }

  citypixel.width = function(x){
    if (!arguments.length) return width;
    width = x;
    return citypixel;
  }

  citypixel.projection = function(x){
    if (!arguments.length) return projection;
    projection = x;
    return citypixel;
  }

  citypixel.duration = function(x){
    if (!arguments.length) return duration;
    duration = x;
    return citypixel;
  }

  d3.rebind(citypixel, dispatch, 'on');

  return citypixel;

  }

})();
