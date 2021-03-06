(function(){

  var cssprawl = window.cssprawl || (window.cssprawl = {});

  cssprawl.map = function(){

    var height = 600,
        width = 600,
        projection,
        dispatch = d3.dispatch("clicked");


    function map(selection){
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
            .projection(projection);

        var tile = d3.geo.tile()
            .scale(projection.scale() * 2 * Math.PI)
            .translate(projection([0, 0]))
            //.zoomDelta((window.devicePixelRatio || 1) - .5)
            .size([width, height]);

        var tiles = tile();

        var retina = window.devicePixelRatio > 1 ? '@2x' : '';
        var token = 'pk.eyJ1IjoiY2l0eXNlbnNpbmdzcHJhd2wiLCJhIjoiNWI1ZTcyNWI2NDM3ZDUxOGIwZTA0OGE1NjAyOWRmNjkifQ.eKo619X85EPFLtB-0-KmOA';

        chart
          .selectAll("image")
            .data(tiles)
          .enter().append("image")
            .attr("xlink:href", function(d) { return "http://api.mapbox.com/v4/citysensingsprawl.a2e7cebf/" + d[2] + "/" + d[0] + "/" + d[1] + retina + ".png?access_token=" + token; })
            //.attr("xlink:href", function(d) { return "http://localhost:3333/tiles/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
            .attr("width", Math.round(tiles.scale))
            .attr("height", Math.round(tiles.scale))
            .attr("x", function(d) { return Math.round((d[0] + tiles.translate[0]) * tiles.scale); })
            .attr("y", function(d) { return Math.round((d[1] + tiles.translate[1]) * tiles.scale); })
            .style("opacity",0)
            .transition()
            .style("opacity",1)

      }); //end selection
    } // end map


  map.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return map;
  }

  map.width = function(x){
    if (!arguments.length) return width;
    width = x;
    return map;
  }
  map.projection = function(x){
    if (!arguments.length) return projection;
    projection = x;
    return map;
  }

  d3.rebind(map, dispatch, 'on');

  return map;

  }

})();
