<script>
    import mapboxgl from "mapbox-gl";
    // import { beanbelt } from "../data/beanbelt.geojson"; //why isn't this working?
    import { onMount } from "svelte";
    export let index;
    export let geoJsonToFit;
  
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZXVuaGFlMTU3MCIsImEiOiJjbGdsNGlzMGIwMGpqM3BtZXZ3MHRzZWM2In0.VyD5HQxUxjsF9gkC7Z5TgQ";
  
    let container;
    let map;
  
    let zoomLevel;
  
    const beanbeltData = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {"line" : "equator"},
        "geometry": {
          "coordinates": [
            [
              -180,
              0
            ],
            [
              180,
              0
            ]
          ],
          "type": "LineString"
        }
      },
      {
        "type": "Feature",
        "properties": {"line" : "belt"},
        "geometry": {
          "coordinates": [
            [
              -180,
              23.5
            ],
            [
              180,
              23.5
            ]
          ],
          "type": "LineString"
        }
      },
      {
        "type": "Feature",
        "properties": {"line" : "belt"},
        "geometry": {
          "coordinates": [
            [
              -180,
              -23.5
            ],
            [
              180,
              -23.5
            ]
          ],
          "type": "LineString"
        }
      }
    ]
  }
  
    // Define your filter condition
    const filter_equator = (feature) => {
        return (
          feature.properties.line === "equator"
        );
      };
    const filter_belt = (feature) => {
        return (
          feature.properties.line === "belt"
        );
      };

    // Filter the features
    const equator = beanbeltData.features.filter(filter_equator);
    const belt = beanbeltData.features.filter(filter_belt);

  
    const mapStyle = {
    "version": 8,
    "name": "Mapbox Country Boundaries tileset v1",
    "sources": {
      "country-boundaries": {
        "type": "vector",
        "url": "mapbox://mapbox.country-boundaries-v1"
      }
    },
    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    "layers": [
      {
        "id": "undisputed country boundary fill",
        "source": "country-boundaries",
        "source-layer": "country_boundaries",
        "type": "fill",
        "filter": [
          "==",
          [
            "get",
            "disputed"
          ],
          "false"
        ],
        "paint": {
          "fill-color": "rgba(66,100,251, 0.3)",
          "fill-outline-color": "#0000ff"
        }
      },
      {
        "id": "disputed area boundary fill",
        "source": "country-boundaries",
        "source-layer": "country_boundaries",
        "type": "fill",
        "filter": [
          "==",
          [
            "get",
            "disputed"
          ],
          "true"
        ],
        "paint": {
          "fill-color": "rgba(200,100,251, 0.3)",
          "fill-outline-color": "#ff0000"
        }
      },
      {
        "id": "undisputed country labels",
        "source": "country-boundaries",
        "source-layer": "country_boundaries",
        "type": "symbol",
        "filter": [
          "==",
          [
            "get",
            "disputed"
          ],
          "false"
        ],
        "layout": {
          "text-field": [
            "step",
            [
              "zoom"
            ],
            [
              "to-string",
              [
                "get",
                "iso_3166_1"
              ]
            ],
            4,
            [
              "concat",
              [
                "get",
                "iso_3166_1"
              ],
              ": ",
              [
                "to-string",
                [
                  "get",
                  "name_en"
                ]
              ]
            ]
          ],
          "text-font": [
            "Open Sans Regular",
            "Arial Unicode MS Regular"
          ],
          "text-padding": 5,
          "text-size": 10
        }
      }
    ]
  };
  
    function updateZoomLevel() {
      const screenWidth = window.innerWidth;
      zoomLevel = screenWidth <= 600 ? 1.2 : 1.43; // Adjust these values as needed
    }
  
    function handleResize() {
      updateZoomLevel();
      map.setZoom(zoomLevel);
    }
  
    onMount(() => {
      updateZoomLevel();
      map = new mapboxgl.Map({
        container,
        style: mapStyle, /* "mapbox://styles/mapbox/light-v11", */
        center: [10,26],
        zoom: zoomLevel,
        attributionControl: true, // removes attribution from the bottom of the map
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
  
      map.on("load", () => {
        map.addSource('lineSource', {
            type: 'geojson',
            data: beanbeltData
            
        });
  
        map.addLayer({
            id: 'equator',
            type: 'line',
            source: 'lineSource',
            filter: ['==', ['get', 'line'], 'equator'],
            layout: {
            'line-join': 'round',
            'line-cap': 'round'
            },
            paint: {
            'line-color': '#a4aac6',
            'line-width': 2,
              'line-dasharray': [2, 4] // This creates a dotted line (2 px line, 2 px gap)
            }
        });

        map.addLayer({
            id: 'beanbelt',
            type: 'line',
            source: 'lineSource',
            filter: ['==', ['get', 'line'], 'belt'],
            layout: {
            'line-join': 'round',
            'line-cap': 'round'
            },
            paint: {
            'line-color': '#a4aac6',
            'line-width': 2,
            }
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
  
  $: if (index === 3) {
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
  
  