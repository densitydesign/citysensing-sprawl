'use strict';

/**
 * @ngdoc directive
 * @name cssprawlApp.directive:citynetwork
 * @description
 * # citynetwork
 */
angular.module('cssprawlApp')
  .directive('citynetwork', function ($rootScope,apiservice) {
    return {
      template: '<div class="viz"></div>',
      replace: true,
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var width = element.width(),
          height = element.height();

        var svg = d3.select(element[0]).append("svg")
          .attr("width", width)
          .attr("height", height);

        var lnksg = svg.append("g").attr("class","links");
        var ndsg = svg.append("g").attr("class","nodes");


        var force = d3.layout.force()
          .gravity(.1)
          .distance(100)
          .friction(0.1)
          .linkDistance(function(d){return lineScale(d.value)})
          .charge(-240)
          .chargeDistance(300)
          .size([width, height]);


        var sizeScale = d3.scale.log().range([5,30]);
        var lineScale = d3.scale.linear().range([0,(height/2)-300]);


        scope.$watch("netData",function(newValue,oldValue){
          if(newValue!==oldValue) {
            drawNetwork(newValue);
          }
        });

        var first = true;



        // draw the network
        function drawNetwork(data) {

          //set scale domains
          //------------------
          sizeScale.domain(d3.extent(data.nodes,function(d){
            return d.value
          }));

          lineScale.domain(d3.extent(data.links,function(d){
            return d.value
          }));

          //find clusters
          //----------------
          var clusters={};

          data.nodes.forEach(function(d,i){
            if(d.type=="cluster") clusters[i] = d.name;
          });

          d3.keys(clusters).forEach(function(d){

            data.nodes[d].cluster = clusters[d];

            data.links.filter(function(e){return e.source == d}).forEach(function(f,j){
              data.nodes[parseInt(f.target)].cluster = clusters[d];
            })
          });

          //draw
          //---------------

            force
              .nodes(data.nodes)
              .links(data.links);


              var link = lnksg.selectAll(".link")
                .data(force.links());



                link.enter().append("line")
                .attr("class", "link")
                .style("stroke-width", function(d) { return Math.sqrt(d.weight); })



          link.exit().transition().duration(400).style("opacity",0).remove();


              var node =ndsg.selectAll(".node")
                .data(force.nodes(), function(d){return d.name});

                var nodeEnter = node.enter().append("g")
                .attr("class", "node")

              nodeEnter.append("circle")
                .attr("r",function(d){return sizeScale(d.value)})
                .style("fill-opacity",0)
                .transition().duration(400)
                .style("fill-opacity",1);

          nodeEnter.append("text")
                .attr("dx", 0)
                .attr("dy", ".35em")
                .attr("text-anchor","middle")
                .text(function(d) { return d.name })
            .style("fill-opacity",0)
            .transition().duration(400)
            .style("fill-opacity",1);

              node
                .each(function(d){
                  var bb = this.getBBox();
                  if(bb.width/2 > sizeScale(d.value)) {
                    d.size = bb.width/2
                  }
                  else {
                    d.size = sizeScale(d.value);
                  }
                })
                .call(force.drag);

          node.exit().transition().duration(400).style("opacity",0).remove();


              force.start();

              force.on("tick", function() {

                //if (force.alpha()<0.1) force.alpha(0.1);

                d3.selectAll("line").attr("x1", function(d) { return d.source.x; })
                  .attr("y1", function(d) { return d.source.y; })
                  .attr("x2", function(d) { return d.target.x; })
                  .attr("y2", function(d) { return d.target.y; });

                var q = d3.geom.quadtree(data.nodes),
                  i = 0,
                  n = data.nodes.length;

                while (++i < n) q.visit(collide(data.nodes[i],d3.selectAll("text")[0][i]));

                d3.selectAll(".node").attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

                if (force.alpha()<0.05) force.alpha(0.05)
              });



          //collision detection function
          //----------------------------

          function collide(node,elem) {


           // var r = sizeScale(node.value) +sizeScale.domain()[1] + 20,
            var r = node.size + sizeScale.domain()[1] +20,
              nx1 = node.x - r,
              nx2 = node.x + r,
              ny1 = node.y - r,
              ny2 = node.y + r;
            return function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                  y = node.y - quad.point.y,
                  l = Math.sqrt(x * x + y * y),
                  r = node.size + quad.point.size +20;
                if (l < r) {
                  l = (l - r) / l * 0.5;
                  node.x -= x *= l;
                  node.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            };
          }
        }
      }
    };
  });
