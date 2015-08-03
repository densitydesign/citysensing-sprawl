'use strict';

/**
 * @ngdoc directive
 * @name cssprawlApp.directive:exponetwork
 * @description
 * # exponetwork
 */
angular.module('cssprawlApp')
  .directive('exponetwork', function ($rootScope,apiservice) {
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

        var mynodes = [];
        var mylinks = [];



        var force = d3.layout.force()
          //.distance(100)
          .gravity(0.15)
          .friction(0.8)
          .nodes(mynodes)
          .links(mylinks)
          .linkDistance(function(d){return lineScale(d.value)})
          .linkStrength(1)
          .charge(-2000)
          .size([width, height]);


        var sizeScale = d3.scale.linear().range([10,40]);
        var lineScale = d3.scale.linear().range([140,50]);


        scope.$watch("netData",function(newValue,oldValue){
          if(newValue!==oldValue) {
            drawNetwork(newValue);
          }
        });

        var first = true;





        // Add and remove elements on the graph object
        var addNode = function (id) {
          nodes.push({"id":id});
          update();
        }

        var removeNode = function (id) {
          var i = 0;
          var n = findNode(id);
          while (i < mylinks.length) {
            if ((mylinks[i]['source'] === n)||(mylinks[i]['target'] == n)) mylinks.splice(i,1);
            else i++;
          }
          var index = findNodeIndex(id);
          if(index !== undefined) {
            mynodes.splice(index, 1);
          }
        }

        var addLink = function (sourceId, targetId, val) {
          var sourceNode = findNode(sourceId);
          var targetNode = findNode(targetId);

          if((sourceNode !== undefined) && (targetNode !== undefined)) {
            mylinks.push({"source": sourceNode, "target": targetNode,"value":val});
          }
        };

        var findNode = function (id) {
          for (var i=0; i < mynodes.length; i++) {
            if (mynodes[i].name === id)
              return mynodes[i]
          };
        }

        var findNodeIndex = function (id) {
          for (var i=0; i < mynodes.length; i++) {
            if (mynodes[i].name === id)
              return i
          };
        }

        // draw the network
        function drawNetwork(data) {

          //set scale domains
          //------------------
          sizeScale.domain([0,d3.max(data.nodes,function(d){
            return d.value
          })]);

          lineScale.domain(d3.extent(data.links,function(d){
            return d.value
          }));


          data.nodes.forEach(function(d){
            var curr = findNode(d.name);

            if(curr === undefined) {
              mynodes.push(d);
            }
            else {
              curr.value = d.value;
            }
          });



          for(var t = mynodes.length- 1; t>=0; t--) {

            var found = data.nodes.filter(function(d){return d.name === mynodes[t].name});
            if(found.length==0) {

              removeNode(mynodes[t].name);
            }
          }



          data.links.forEach(function(d){

              addLink(data.nodes[d.source].name,data.nodes[d.target].name, d.value);

          });



          //draw
          //---------------


          var link = lnksg.selectAll(".link")
            //.data(force.links(),function(d){return d.source.name + "-" + d.target.name;});
            .data(force.links())


          link.enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function(d) { return Math.sqrt(d.weight); });



          link.exit().transition().duration(400).style("opacity",0).remove();


          var node =svg.selectAll(".node")
            .data(force.nodes(), function(d){return d.name.toLowerCase()});

          var txts =svg.selectAll(".txts")
            .data(force.nodes(), function(d){return d.name.toLowerCase()});

          var nodeEnter = node.enter().append("circle")
            .attr("fill-opacity",0)
            .attr("fill","#000")
            .attr("stroke-width", 1)
            .attr("class","node")
            .attr("r",0);

          var nodeText = txts.enter().append("text")
            .attr("dx", 0)
            .attr("dy", ".35em")
            .attr("class","txts")
            .attr("font-size", "10px")
            .attr("text-anchor","middle")
            .text(function(d) {
              if(d.type == "cluster"){d.name = d.name.toUpperCase()};
              return d.name;
            })
            .style("fill-opacity",0);


          node
            .transition().duration(400)
            .attr("r",function(d){ return sizeScale(d.value)})
            .attr("fill-opacity",1)
            .filter(function(d){return d.type == "cluster"})
            .attr("fill","#0EA789")

          txts
            .transition().duration(400)
            .style("fill-opacity",1)
            .filter(function(d){
              return d.type == "cluster";
            })
            .attr("font-size", "12px")

          txts
            .each(function(d){
              var bb = this.getBBox();
              if(bb.width/2 > sizeScale(d.value)) {
                d.size = bb.width/2
              }
              else {
                d.size = sizeScale(d.value);
              }
            })


          node.exit().transition().duration(400)
            .attr("r",0)
            .style("fill-opacity",0)
            .remove();

          txts.exit().transition().duration(400).style("fill-opacity",0).remove();

          force.start();


          force.on("tick", function() {

           d3.selectAll("line").attr("x1", function(d) { return d.source.x; })
             .attr("y1", function(d) { return d.source.y; })
             .attr("x2", function(d) { return d.target.x; })
             .attr("y2", function(d) { return d.target.y; });

            var q = d3.geom.quadtree(force.nodes()),
              i = 0,
              n = force.nodes().length;

            while (++i < n) q.visit(collide(force.nodes()[i],d3.selectAll(".txts")[0][i]));

            d3.selectAll(".node")//.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            .attr('cx', function(d) { d.x = Math.max(d.size, Math.min(width - d.size, d.x)); return d.x; })
              .attr('cy', function(d) { d.y = Math.max(d.size, Math.min(height - d.size, d.y)); return d.y;});

            d3.selectAll(".txts")//.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
              .attr('x', function(d) { d.x = Math.max(d.size, Math.min(width - d.size, d.x)); return d.x; })
              .attr('y', function(d) { d.y = Math.max(d.size, Math.min(height - d.size, d.y)); return d.y;});

            //if (force.alpha()<0.01) force.alpha(0.01)
          });



          //collision detection function
          //----------------------------

          function collide(node,elem) {


            // var r = sizeScale(node.value) +sizeScale.domain()[1] + 20,
            var r = node.size + sizeScale.domain()[1] +10,
              nx1 = node.x - r,
              nx2 = node.x + r,
              ny1 = node.y - r,
              ny2 = node.y + r;
            return function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                  y = node.y - quad.point.y,
                  l = Math.sqrt(x * x + y * y),
                  r = node.size + quad.point.size +10;
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
