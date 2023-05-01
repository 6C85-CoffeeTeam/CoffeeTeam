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

  let zoomLevel;

  let countriesData;

  d3.json(
      "https://raw.githubusercontent.com/6C85-CoffeeTeam/CoffeeTeam/main/coffee-app/src/data/world.geojson"
    ).then((data) => {
      countriesData = data;
    });



//   const mapStyle = {
//   "version": 8,
//   "name": "Mapbox Country Boundaries tileset v1",
//   "sources": {
//     "country-boundaries": {
//       "type": "vector",
//       "url": "mapbox://mapbox.country-boundaries-v1"
//     }
//   },
//   "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
//   "layers": [
//     {
//       "id": "undisputed country boundary fill",
//       "source": "country-boundaries",
//       "source-layer": "country_boundaries",
//       "type": "fill",
//       "filter": [
//         "==",
//         [
//           "get",
//           "disputed"
//         ],
//         "false"
//       ],
//       "paint": {
//         "fill-color": "rgba(66,100,251, 0.3)",
//         "fill-outline-color": "#0000ff",
//         // "fill-outline-width": 1
//       }
//     },
//     {
//       "id": "undisputed country labels",
//       "source": "country-boundaries",
//       "source-layer": "country_boundaries",
//       "type": "symbol",
//       "filter": [
//         "==",
//         [
//           "get",
//           "disputed"
//         ],
//         "false"
//       ],
//       "layout": {
//         "text-field": [
//           "step",
//           [
//             "zoom"
//           ],
//           [
//             "to-string",
//             [
//               "get",
//               "iso_3166_1"
//             ]
//           ],
//           4,
//           [
//             "concat",
//             [
//               "get",
//               "iso_3166_1"
//             ],
//             ": ",
//             [
//               "to-string",
//               [
//                 "get",
//                 "name_en"
//               ]
//             ]
//           ]
//         ],
//         "text-font": [
//           "Open Sans Regular",
//           "Arial Unicode MS Regular"
//         ],
//         "text-padding": 5,
//         "text-size": 10
//       }
//     }
//   ]
// };

  function updateZoomLevel() {
    const screenWidth = window.innerWidth;
    zoomLevel = screenWidth <= 600 ? 1 : 1.45; // Adjust these values as needed
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
      center: [10,26],
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
  
        map.addLayer({
            id: 'country-fills',
            type: 'heatmap',
            source: 'countries',

            paint: {
              'heatmap-weight': {
                property: 'coffee',
                type: 'linear',
                stops: [
                  [1, 0],
                  [62, 1]
                ]
              },

            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(236,222,239,0)',
              100,
              'rgb(208,209,230)',
              200,
              'rgb(166,189,219)',
              300,
              'rgb(103,169,207)',
              400,
              'rgb(28,144,153)'
            ]
            }
            // filter: ['==', ['get', 'line'], 'equator'],
            // layout: {},
            // paint: {
            // 'fill-color': '#627BC1', 
            // 'fill-opacity': [
            //   'case',
            //   ['boolean', ['feature-state', 'hover'], false],
            //   1,
            //   0.5
            //   ]
            // }
        });
        map.addLayer({
            'id': 'country-borders',
            'type': 'line',
            'source': 'countries',
            'layout': {},
            'paint': {
            'line-color': '#000',
            'line-width': 0
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

<div class="map" class:visible={isVisible} bind:this={container} />

<style>
  .map {
    width: 100%;
    height: 100vh; /* check problem when setting width */
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transition: opacity 2s, visibility 2s;
    outline: blue solid 0px;
  }

  .map.visible {
    opacity: 1;
    visibility: visible;
  }
</style>
