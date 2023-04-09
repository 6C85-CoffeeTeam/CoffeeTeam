<script>
    import * as d3 from 'd3';
    import {onMount} from 'svelte';
  
    export let colorScale;
    export let title = "Color Scale Legend";
  
    const legendWidth = 200;
    const legendHeight = 30;
  
    let svg;
  
    // Create the legend when the component mounts
    onMount(() => {
      svg = d3.select('#legend')
        .append('svg')
        .attr('width', legendWidth)
        .attr('height', legendHeight);
  
      const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(0, 100)`);
  
      const legendScale = d3.scaleLinear()
        .range([0, legendWidth - 20])
        .domain([colorScale.domain()[0], colorScale.domain()[1]]);
  
      const legendAxis = d3.axisBottom(legendScale)
        .tickValues(colorScale.domain())
        .tickFormat(d => d.toFixed(2))
        .tickSize(10)
        .tickPadding(5);
  
      legend.call(legendAxis);
  
      const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
  
      gradient.selectAll('stop')
        .data(colorScale.range())
        .enter()
        .append('stop')
        .attr('offset', (d, i) => `${i / (colorScale.range().length - 1) * 100}%`)
        .attr('stop-color', d => d)
        .attr('stop-opacity', 1);
  
      svg.append('rect')
        .attr('x', 10)
        .attr('y', 20)
        .attr('width', legendWidth - 20)
        .attr('height', 10)
        .style('fill', 'url(#gradient)');
    });
  </script>
  
  <h3>{title}</h3>
  
  <div id="legend"></div>
  