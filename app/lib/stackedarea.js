(function(){

  var cssprawl = window.cssprawl || (window.cssprawl = {});

  cssprawl.stackedArea = function(){

    var height = 600,
        width = 600,
        startDate,
        endDate,
        stackColors = ["#0EA789", "#0EA789"],
        brushDate,
        duration = 2000,
        dispatch = d3.dispatch("clicked");


    function stackedArea(selection){
      selection.each(function(data){

        if(!data[0].values.length){
          return
        }

        var chart;
        var margin = {top: 10, right: 50, bottom: 40, left: 0},
            chartWidth = width - margin.left - margin.right,
            chartHeight = height - margin.top - margin.bottom;

        if (selection.select('svg').empty()){
          chart = selection.append('svg')
          .attr('width', width)
          .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }
        else
        {
          chart = selection.select('svg')
          .attr('width', width)
          .attr('height', height)
            .select("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        }

        var x = d3.time.scale()
            .range([0, chartWidth]);

        var y = d3.scale.linear()
            .range([chartHeight, 0]);

        var colorDomain = data.map(function(d){return d.key});

        var color = d3.scale.ordinal().range(stackColors).domain(colorDomain)

        var area = d3.svg.area()
            .x(function(d) { return x(new Date(d.date)); })
            .y0(function(d) { return y(d.y0); })
            .y1(function(d) { return y(d.y0 + d.y); })
            .interpolate('step-after')

        var stack = d3.layout.stack()
            .values(function(d) { return d.values; })
            .x(function x(d) {return d.date})
            .y(function y(d) {return d.value})

        var layers = stack(data)

        var yStackMax = d3.max(layers, function(layer) {return d3.max(layer.values, function(d) { return d.y0 + d.y; }); });
        var xMax = d3.max(layers, function(layer) {return d3.max(layer.values, function(d) { return new Date(d.date); }); });
        var xMin = d3.min(layers, function(layer) {return d3.min(layer.values, function(d) { return new Date(d.date); }); });


        if(startDate){
          var  xMin = new Date(startDate)
        }
        if (endDate) {
          var xMax = new Date(endDate)
        }

        x.domain([xMin,xMax])
        y.domain([0,yStackMax])

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("right")
            .tickValues([0, yStackMax])
            .tickFormat(function(d){
              var format = d3.format('0.2s')
              if(d == 0)
                return 0
              else
                return format(d)
            })


        // var stacked = chart.selectAll(".stack")
        //               .data(layers)
        //               .enter().append("g")
        //               .attr("class", "stack")
        //               .attr("opacity", function(d,i){return i > 0 ? 0.5 : 0.9})

        var stacked = chart.selectAll(".area")
                      .data(layers, function(d){return d.key})

        stacked
          .attr("d", function(d) { return area(d.values); })

        stacked.enter().append("path")
            .attr("class", "area")
            .attr("d", function(d) { return area(d.values); })
            .attr("fill", function(d) { return color(d.key); })
            .attr("fill-opacity", function(d,i){return i > 0 ? 0.5 : 0.9});

        // stacked.append("path")
        //   .attr("class", "area")
        //   .attr("d", function(d) { return area(d.values); })
        //   .attr("fill", function(d) { return color(d.key); });


        var fakeBrush = chart.selectAll(".fakeBrush").data(["brush"])

        fakeBrush
          .transition()
          .duration(duration)
          .attr("width", chartWidth - x(new Date(brushDate)))
          .attr("x", x(new Date(brushDate)))

        fakeBrush
          .enter()
          .append("rect")
          .attr("height", chartHeight)
          .attr("width", chartWidth - x(xMin))
          .attr("class", "fakeBrush")
          .attr("x", x(xMin))
          .attr("y", 0)
          .attr("fill", "black")
          .attr("fill-opacity", 0.7)

          var fakeLine = chart.selectAll(".fakeLine").data(["brush"])

          fakeLine
            .transition()
            .duration(duration)
            .attr("x", x(new Date(brushDate)))

          fakeLine
            .enter()
            .append("rect")
            .attr("height", chartHeight)
            .attr("width", 1)
            .attr("class", "fakeLine")
            .attr("x", x(xMin))
            .attr("y", 0)
            .attr("fill", "white")


        var legendScale = d3.scale.ordinal().rangeBands([0, chartWidth], 0, 0.1).domain(colorDomain)

        var legends = chart.selectAll(".timeline-legend").data(colorDomain)

        var legend = legends.enter()
          .append("g")
          .attr("class", "timeline-legend")
          .attr("transform", function(d){ return "translate(" + legendScale(d) + "," + (height - 20) + ")"});

        legend
          .append("rect")
          .attr("fill", function(d){return color(d)})
          .attr("width", 15)
          .attr("height", 15)
          .attr("x", 0)
          .attr("y", -15)
          .attr("opacity", function(d,i){return i > 0 ? 0.5 : 0.9})

        legend
          .append("text")
          .text(function(d){return d.toUpperCase()})
          .attr("x", 20)
          .attr("dy", "-0.1em")

        if(chart.select("g.x.axis").empty() || chart.select("g.y.axis").empty()){
          var lineData = [ { "x": 0,   "y": 0},  { "x": chartWidth,  "y": 0}];
          var lineFunction = d3.svg.line()
                           .x(function(d) { return d.x; })
                           .y(function(d) { return d.y; })
                           .interpolate("linear");

          chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + chartHeight + ")")
              .append("path")
              .attr("d", lineFunction(lineData))


          chart.append("g")
              .attr("class", "y axis")
              .attr("transform", "translate(" + chartWidth + ",0)")
              .call(yAxis);
        }else{
          chart.select("g.y.axis").call(yAxis)
        }

      }); //end selection
    } // end stackedArea


  stackedArea.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return stackedArea;
  }

  stackedArea.width = function(x){
    if (!arguments.length) return width;
    width = x;
    return stackedArea;
  }

  stackedArea.stackColors = function(x){
    if (!arguments.length) return stackColors;
    stackColors = x;
    return stackedArea;
  }

  stackedArea.brushDate = function(x){
    if (!arguments.length) return brushDate;
    brushDate = x;
    return stackedArea;
  }

  stackedArea.startDate = function(x){
    if (!arguments.length) return startDate;
    startDate = x;
    return stackedArea;
  }

  stackedArea.endDate = function(x){
    if (!arguments.length) return endDate;
    endDate = x;
    return stackedArea;
  }

  stackedArea.duration = function(x){
    if (!arguments.length) return duration;
    duration = x;
    return stackedArea;
  }


  d3.rebind(stackedArea, dispatch, 'on');

  return stackedArea;

  }

})();
