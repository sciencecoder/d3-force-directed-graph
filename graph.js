//inspiration: https://bl.ocks.org/shimizu/e6209de87cdddde38dadbb746feaf3a3

var svg = d3.select('svg');
var svgHeight = svg.attr('height');
var svgWidth = svg.attr('width');
$.getJSON('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', function(data) {
  var nodeData = data.nodes;
  var linkData = data.links;
  var tool_tip = d3.select('#tool_tip');
   var force = d3.forceSimulation()
   .nodes(nodeData)
   .force("link", d3.forceLink(linkData).distance(15))
   .force("charge", d3.forceManyBody().strength(-50))
   .force("center", d3.forceCenter(svgWidth / 2, svgHeight / 2))
   .force('x_force', d3.forceX(0).x(0.5))
   .force('y_force', d3.forceY(0).y(0.5))
  
 var link = svg
    .selectAll("line")
    .data(linkData)
    .enter()
    .append("line")
    .attr("stroke", "black");

    var nodes = d3.select('#container')
    .selectAll('.node')
    .data(nodeData)
    .enter()
    .append('img')
    .attr('class', function(d) {return 'flag flag-' + d.code;})
    	.on("mouseover", (d) => {
			tool_tip.style("display", "block");
			tool_tip.html(d.country)
				.style("left", d3.event.pageX + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", (d) => {
			tool_tip.style("display", "none");
		})
    .call(d3.drag()
     .on("start", dragstarted)
     .on("drag", dragged)
     .on("end", dragended));
  
  var ticked = function() {

    link
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });

    nodes.style("left", function(d) { return d.x + 'px'; })
         .style("top", function(d) { return (d.y - 3)  + 'px'; });
  }

  force.on("tick", ticked);

  function dragstarted(d) {
    if (!d3.event.active) force.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) force.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

});
 
