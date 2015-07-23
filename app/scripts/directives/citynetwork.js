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

        var force = d3.layout.force()
          .gravity(.1)
          .distance(300)
          .linkDistance(function(d){return lineScale(d.value)})
          .charge(-140)
          .size([width, height]);

        var sizeScale = d3.scale.log().range([5,30]);
        var lineScale = d3.scale.linear().range([0,(height/2)-100]);


        scope.$watch("netData",function(newValue,oldValue){
          if(newValue!==oldValue) {
            drawNetwork(newValue);
          }
        });



        // draw the network
        function drawNetwork(data) {

          sizeScale.domain(d3.extent(data.nodes,function(d){
            return d.value
          }));

          lineScale.domain(d3.extent(data.links,function(d){
            return d.value
          }));

          force
            .nodes(data.nodes)
            .links(data.links)
            .start();

          var link = svg.selectAll(".link")
            .data(data.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.weight); });

          var node = svg.selectAll(".node")
            .data(data.nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(force.drag);

          node.append("circle")
            .attr("r",function(d){return sizeScale(d.value)});

          node.append("text")
            .attr("dx", 0)
            .attr("dy", ".35em")
            .attr("text-anchor","middle")
            .text(function(d) { return d.name });

          force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

            var q = d3.geom.quadtree(data.nodes),
              i = 0,
              n = data.nodes.length;

            while (++i < n) q.visit(collide(data.nodes[i]));

            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          });



          function collide(node) {
            var r = sizeScale(node.value) +sizeScale.domain()[1] + 20,
              nx1 = node.x - r,
              nx2 = node.x + r,
              ny1 = node.y - r,
              ny2 = node.y + r;
            return function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                  y = node.y - quad.point.y,
                  l = Math.sqrt(x * x + y * y),
                  r = sizeScale(node.value) + sizeScale(quad.point.value)+20;
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
