<script>
  import mapboxgl from "mapbox-gl";
  import * as d3 from "d3";
  import { onMount } from "svelte";
  export let index;
  export let geoJsonToFit;


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
      projection: 'mercator',
      style: "mapbox://styles/mapbox/light-v11",
      center: [10,10],
      zoom: zoomLevel,
      attributionControl: false, // removes attribution from the bottom of the map
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

      map.addSource('countries', {
            type: 'geojson',
            data: countriesData
        });

      // indicate coffee production quantities and the color that
      // they get - palette is from https://www.color-hex.com/color-palette/30023
      const stops =  [[5, '#ffffff'],
        [20, '#ece0d1'],
        [80, '#dbc1ac'],
        [320, '#967259'],
        [1280, '#634832'],
        [5120, '#38220f']]

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
  
        map.addLayer({
            id: 'country-fills',
            type: 'fill',
            source: 'countries',
            layout: {},

            paint: {
              'fill-color': {
                property: 'coffee',
                stops: stops
              },
              "fill-opacity": 0.6
            }
        
        });

        map.addLayer({
            'id': 'country-borders',
            'type': 'line',
            'source': 'countries',
            'layout': {},
            'paint': {
            'line-color': '#bcbcbc',
            'line-width': 1
            }
          });
      
        // When the user moves their mouse over the country-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on('mousemove', 'country-fills', (e) => {
          if (e.features.length > 0) {
            if (hoveredStateId !== null) {
              map.setFeatureState(
                { source: 'countries', id: hoveredStateId },
                { hover: false }
                );
              }
            hoveredStateId = e.features[0].id;
              map.setFeatureState(
                { source: 'countries', id: hoveredStateId },
                { hover: true }
            );
          }
        });
        // When the mouse leaves the country-fill layer, update the feature state of the
        // previously hovered feature.
        map.on('mouseleave', 'country-fills', () => {
          if (hoveredStateId !== null) {
            map.setFeatureState(
              { source: 'countries', id: hoveredStateId },
              { hover: false }
              );
            }
          hoveredStateId = null;
        }); 
        hideLabelLayers();
          updateBounds();
          map.on("zoom", updateBounds);
          map.on("drag", updateBounds);
          map.on("move", updateBounds);
        });


        // create legend
        legend = document.getElementById('legend');
        const item = document.createElement('div');
        const key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = '#ece0d1';
        const value = document.createElement('span');
          value.innerHTML = `${'awdawd'}`;
          //value.innerHTML = stop[0];
          item.appendChild(key);
          item.appendChild(value);
          legend.appendChild(item);


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

$: if (index === 4) {
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

<div id="map" class:visible={isVisible} bind:this={container} />
<div class='map-overlay' id='legend' class:visible={isVisible} bind:this={container}/>



<!-- <div class="legend" class:visible={isVisible} bind:this={container} /> -->
<!-- <div class="legend" class:visible={isVisible} bind:this={container} /> -->
<!-- <div class='map-overlay' id='legend' class:visible={isVisible} bind:this={container}></div> -->
<style>
  .map-overlay {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #fff;
    margin-right: 0px;
    font-family: Arial, sans-serif;
    overflow: auto;
    border-radius: 3px;
  }

  #map {
    width: 100%;
    height: 100vh; /* check problem when setting width */
    position: absolute;
    opacity: 1;
    visibility: hidden;
    transition: opacity 2s, visibility 2s;
    outline: blue solid 0px;
  }

  #map.visible {
    opacity: 1;
    visibility: visible;
  }


  #legend {
  padding: 0px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  line-height: 18px;
  height: 100vh;
  margin-bottom: 0px;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 2s, visibility 2s;
}

#legend.visible {
    opacity: 1;
    visibility: visible;
  }

#legend-key {
  display: inline-block;
  border-radius: 20%;
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
</style>
