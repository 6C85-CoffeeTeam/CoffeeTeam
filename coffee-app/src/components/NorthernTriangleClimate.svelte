<script>
    import * as d3 from "d3";
    import Legend from "./Legend.svelte";

    export let NorthernTriangleClimateDataset = [];
    import { draw } from "svelte/transition";
    import { quadInOut } from "svelte/easing";
    const projection = d3.geoNaturalEarth1();
    const path = d3.geoPath(projection);

    let recorded_mouse_position = {
		x: 0, y: 0
	  };


    let hovered = -1;

    const colorScale = d3.scaleLinear()
  .domain([0, 58211])
  .range(["white", "brown"])
  </script>

<div class=visualization>
  <svg width="1000", height="600">
    {#each NorthernTriangleClimateDataset as data, index}
      <path
        d={path(data)}
        
        fill={index === hovered ? "green" : colorScale(data["properties"]["coffee"])}
        on:mouseover={(event) => {
          hovered = index;
        	recorded_mouse_position = {
						x: event.pageX,
						y: event.pageY
					}}}
        on:mouseout={(event) => { hovered = -1; }} 
      />
  {/each}
  </svg>

  <div
    class={hovered === -1 ? "tooltip-hidden": "tooltip-visible"}	
    style="left: {recorded_mouse_position.x}px; top: {recorded_mouse_position.y}px">>
    {#if hovered !== -1}
        Country: {NorthernTriangleClimateDataset[hovered]["properties"]["name"]}
        <br>
        Coffee production (thousand 60 kg bags): {NorthernTriangleClimateDataset[hovered]["properties"]["coffee"]}
    {/if}
  </div>




  <div class="legend">
    <div
      class="bar"
      style="background:linear-gradient(to bottom, {colorScale.range()[0]}, {colorScale.range()[1]});
      right:50px;
      top:60px;"
    />
  </div>

</div>


<main>
  <!-- Note from Austin: this is how we'll get a good legend going, but for now this doesn't
  work at all-->
  <!-- <Legend colorScale={colorScale} title="Thousands of 60kg bags" /> -->
</main>




  

  <style>
    /* .visualization {
      font: 25px sans-serif;
      margin: auto;
      margin-top: 1px;
      text-align: middle;
    } */
    /* dynamic classes for the tooltip */
    path {
      stroke: black;
    }
    .bar {
      height: 60%;
      width: 40px;
      position:absolute;
    }
    .tooltip-hidden {
      visibility: hidden;
      font-family: "Nunito", sans-serif;
      width: 200px;
      position: absolute;
    }
    .tooltip-visible {
      font: 15px sans-serif;
      font-family: "Nunito", sans-serif;
      visibility: visible;
      background-color: #f0dba8;
      border-radius: 10px;
      width: 200px;
      color: black;
      position: absolute;
      padding: 10px;
    }
  </style>