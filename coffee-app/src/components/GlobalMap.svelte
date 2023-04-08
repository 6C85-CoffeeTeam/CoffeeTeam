<script>
    import * as d3 from "d3";
    export let dataset = [];
    import { draw } from "svelte/transition";
    import { quadInOut } from "svelte/easing";
    const projection = d3.geoNaturalEarth1();
    const path = d3.geoPath(projection);

    const colorScale = d3.scaleThreshold()
  .domain([0, 50, 200, 800, 3200, 12800, 51200])
  .range(d3.schemeBlues[7])
  </script>

  {#each dataset as data}
    <path
      d={path(data)}
      fill={colorScale(data["properties"]["coffee"])}
    />
  {/each}
  
  <!-- <style>
    path {
      fill : none;
      stroke: darkgreen;
    }
  </style> -->