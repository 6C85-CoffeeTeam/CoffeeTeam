<script>
  import mapboxgl from "mapbox-gl";
  import * as d3 from "d3";
  import { onMount } from "svelte";
  export let index;
  export let geoJsonToFit;

  // indicate coffee production quantities and the color that
  // they get - palette is from https://www.color-hex.com/color-palette/30023
  const stops = [
    [5, "#ffffff"],
    [20, "#ece0d1"],
    [80, "#dbc1ac"],
    [320, "#967259"],
    [1280, "#634832"],
    [5120, "#38220f"],
  ];

  let hoverColor ="red";

  let scaleLabel = "Thousands of 60kg bags";
  let colorScale = d3
    .scaleThreshold()
    .domain([5, 20, 80, 320, 1280])
    .range(["#ffffff", "#ece0d1", "#dbc1ac", "#967259", "#634832", "#38220f"]);
  // let colorScale = d3.scaleSequential(d3.interpolateReds);
  let domain = [0, 58211];

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZXVuaGFlMTU3MCIsImEiOiJjbGdsNGlzMGIwMGpqM3BtZXZ3MHRzZWM2In0.VyD5HQxUxjsF9gkC7Z5TgQ";

  let container;
  let map;
  let legend;

  let zoomLevel;

  let countriesData;

  d3.json(
    "https://raw.githubusercontent.com/6C85-CoffeeTeam/CoffeeTeam/main/coffee-app/src/data/world.geojson"
  ).then((data) => {
    countriesData = data;
  });

  function updateZoomLevel() {
    const screenWidth = window.innerWidth;
    zoomLevel = screenWidth <= 600 ? 1.15 : 1.8; // Adjust these values as needed
  }

  function handleResize() {
    updateZoomLevel();
    map.setZoom(zoomLevel);
  }

  onMount(() => {
    updateZoomLevel();
    map = new mapboxgl.Map({
      container,
      projection: "mercator",
      style: "mapbox://styles/mapbox/light-v11",
      center: [10, 10],
      zoom: zoomLevel,
      minZoom: zoomLevel,
      maxZoom: zoomLevel,
      scrollZoom: false,
      attributionControl: false // removes attribution from the bottom of the map
    });

    window.addEventListener("resize", handleResize);

    function hideLabelLayers() {
      const labelLayerIds = map
        .getStyle()
        .layers.filter(
          (layer) =>
            layer.type === "symbol" && /label|text|place/.test(layer.id)
        )
        .map((layer) => layer.id);

      for (const layerId of labelLayerIds) {
        map.setLayoutProperty(layerId, "visibility", "none");
      }
    }

    let hoveredStateId = null;

    map.on("load", () => {
      map.addSource("countries", {
        type: "geojson",
        data: countriesData,
      });

      //     map.addLayer({
      //     "id": 'counties',
      //     "type": "fill",
      //     "source": {
      //         "type": "geojson",
      //         "data": {
      //             "type": "FeatureCollection",
      //             "features": counties
      //         }
      //     },
      //     "layout": {},
      //     "paint": {
      //         "fill-color": oc,
      //         "fill-opacity": 0.8
      //     }
      // });

      // When the user moves their mouse over the country-fill layer, we'll update the
      // feature state for the feature under the mouse.
      map.on("mousemove", "country-fills", (e) => {
        if (e.features.length > 0) {
          if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: "countries", id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: "countries", id: hoveredStateId },
            { hover: true }
          );

         // Add the code here for showing the tooltip
        popup.setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.name) // assuming `name` is the property containing the country name
            .addTo(map);
        }
      });
      // When the mouse leaves the country-fill layer, update the feature state of the
      // previously hovered feature.
      map.on("mouseleave", "country-fills", () => {
        if (hoveredStateId !== null) {
          map.setFeatureState(
            { source: "countries", id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
        // Add the code here for hiding the tooltip
        popup.remove();
      });

      map.addLayer({
        id: "country-fills",
        type: "fill",
        source: "countries",
        layout: {},

        paint: {
          "fill-color": {
            property: "coffee",
            stops: stops,
          },
          "fill-opacity": 0.8,
        },
      });

      map.addLayer({
        id: "country-borders",
        type: "line",
        source: "countries",
        layout: {},
        paint: {
          "line-color": "#bcbcbc",
          "line-width": 1,
        },
      });

      hideLabelLayers();
      updateBounds();
      map.on("zoom", updateBounds);
      map.on("drag", updateBounds);
      map.on("move", updateBounds);
    });

    let popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // // create legend
    // legend = document.getElementById("legend");
    // const item = document.createElement("div");
    // const key = document.createElement("span");
    // key.className = "legend-key";
    // key.style.backgroundColor = "#ece0d1";
    // const value = document.createElement("span");
    // value.innerHTML = `${"awdawd"}`;
    // //value.innerHTML = stop[0];
    // item.appendChild(key);
    // item.appendChild(value);
    // legend.appendChild(item);

    // stops.forEach((stop, i) => {
    //   const color = stop[1];
    //   const item = document.createElement('div');
    //   const key = document.createElement('span');
    //   key.className = 'legend-key';
    //   // key.style.backgroundColor = color;
    //   key.style.backgroundColor = '#ece0d1';

    //   const value = document.createElement('span');
    //   value.innerHTML = `${'awdawd'}`;
    //   //value.innerHTML = stop[0];
    //   item.appendChild(key);
    //   item.appendChild(value);
    //   legend.appendChild(item);
    // });
  });

  function updateBounds() {
    const bounds = map.getBounds();
    geoJsonToFit.features[0].geometry.coordinates = [
      bounds._ne.lng,
      bounds._ne.lat,
    ];
    geoJsonToFit.features[1].geometry.coordinates = [
      bounds._sw.lng,
      bounds._sw.lat,
    ];
  }

  let isVisible = false;

  $: if (index === 1) {
    isVisible = true;
  } else {
    isVisible = false;
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://api.mapbox.com/mapbox-gl-js/v2.14.0/mapbox-gl.css"
  />
</svelte:head>

<div class="map" class:visible={isVisible} bind:this={container}>

<!-- {#if isVisible}
  <div class="scale">
    <p><strong style:font-size="25px">{scaleLabel}</strong></p>
    <div
      style:background-image="linear-gradient(to right, {colorScale(domain[0])}, {colorScale(
        (domain[1] - domain[0]) * 0.25
      )}, {colorScale((domain[1] - domain[0]) * 0.5)}, {colorScale(
        (domain[1] - domain[0]) * 0.75
      )}, {colorScale(domain[1])})"
    />
    <p style:font-size="25px">
      <span style:float="left">{domain[0]}</span>
      <span style:float="right">{domain[1]}</span>
    </p>
  </div>
{/if} -->

<!-- const stops = [
    [5, "#ffffff"],
    [20, "#ece0d1"],
    [80, "#dbc1ac"],
    [320, "#967259"],
    [1280, "#634832"],
    [5120, "#38220f"],
  ]; -->

{#if isVisible}
  <div class="scale" class:visible={isVisible}>
    <p><strong style:font-size="18px">{scaleLabel}</strong></p>
    <div>
      <span class="legend-key" style:background-color={stops[0][1]} />
      <span class="legend-label"> &lt;{stops[0][0]}</span>
    </div>
    <div>
      <span class="legend-key" style:background-color={stops[1][1]} />
      <span class="legend-label"> {stops[0][0]}-{stops[1][0]}</span>
    </div>
    <div>
      <span class="legend-key" style:background-color={stops[2][1]} />
      <span class="legend-label"> {stops[1][0]}-{stops[2][0]}</span>
    </div>
    <div>
      <span class="legend-key" style:background-color={stops[3][1]} />
      <span class="legend-label"> {stops[2][0]}-{stops[3][0]}</span>
    </div>
    <div>
      <span class="legend-key" style:background-color={stops[4][1]} />
      <span class="legend-label"> {stops[3][0]}-{stops[4][0]}</span>
    </div>
    <div>
      <span class="legend-key" style:background-color={stops[5][1]} />
      <span class="legend-label"> {stops[4][0]}+</span>
    </div>
  </div>
{/if}

<!-- <div
      style:background-image="linear-gradient(to right, {colorScale(domain[0])}, {colorScale(
        (domain[1] - domain[0]) * 0.25
      )}, {colorScale((domain[1] - domain[0]) * 0.5)}, {colorScale(
        (domain[1] - domain[0]) * 0.75
      )}, {colorScale(domain[1])})"
    />
    <p style:font-size="25px">
      <span style:float="left">{domain[0]}</span>
      <span style:float="right">{domain[1]}</span>
    </p> -->
</div>

<style>
  .map {
    width: 100%;
    height: 100vh; /* check problem when setting width */
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transition: opacity 2s, visibility 2s;
    /* outline: blue solid 0px; */

  }

  .map.visible {
    opacity: 1;
    visibility: visible;
  }

  .scale {
    position: absolute;
    z-index: 1000;
    bottom: 0px;
    left: 30px;
    width: 275px;
    height: 45vh;
    opacity: 1;
    visibility: hidden;
  }

  .scale.visible {
    visibility: visible;
    opacity: 1;
    transition: opacity 10s, visibility 10s;

  }

  .scale div {
    width: max(300px, 100%);
    height: 35px;
    margin: 10px;
    opacity: 1;
  }

  .scale p {
    font-family: "Space Mono", monospace;
    width: max(300px, 100%);
  }


  .legend-key {
    display: inline-block;
    border-radius: 20%;
    width: 35px;
    height: 35px;
    margin-left: 0px;
    opacity: 1;
  }
  
  .legend-label {
    font-size: 18px;
    margin-top: 0px;
    margin-left: 10px;
    font-family: "Space Mono", monospace;
  }

  /* #legend {
    padding: 0px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    line-height: 18px;
    height: 100vh;
    margin-bottom: 0px;
    width: 100%;
    opacity: 0;
    visibility: visible;
    transition: opacity 2s, visibility 2s;
  } */

  /* #legend.visible {
    opacity: 1;
    visibility: visible;
  } */


</style>
