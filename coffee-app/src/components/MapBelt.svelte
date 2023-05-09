<script>
    import mapboxgl from "mapbox-gl";
    import * as d3 from "d3";
    // import { beanbelt } from "../data/beanbelt.geojson"; //why isn't this working?
    import { onMount } from "svelte";
    export let index;
    export let geoJsonToFit;
    import { fade } from 'svelte/transition';
  
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZXVuaGFlMTU3MCIsImEiOiJjbGdsNGlzMGIwMGpqM3BtZXZ3MHRzZWM2In0.VyD5HQxUxjsF9gkC7Z5TgQ";
  
    let container;
    let map;
  
    let zoomLevel;
  
    const beanbeltData = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"line":"equator"},"geometry":{"coordinates":[[-180,0],[180,0]],"type":"LineString"}},{"type":"Feature","properties":{"line":"belt"},"geometry":{"coordinates":[[-180,23.5],[180,23.5]],"type":"LineString"}},{"type":"Feature","properties":{"line":"belt"},"geometry":{"coordinates":[[-180,-23.5],[180,-23.5]],"type":"LineString"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[[[-180,23.5],[-180,-23.5],[180,-23.5],[180,23.5],[-180,23.5]]],"type":"Polygon"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-160,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-140,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-120,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-100,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-80,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-60,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-40,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[-20,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[0,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[20,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[40,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[60,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[80,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[100,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[120,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[140,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[160,0],"type":"Point"}},{"type":"Feature","properties":{},"geometry":{"coordinates":[180,0],"type":"Point"}}]}
  
    // // Define your filter condition
    // const filter_equator = (feature) => {
    //     return (
    //       feature.properties.line === "equator"
    //     );
    //   };
    // const filter_belt = (feature) => {
    //     return (
    //       feature.properties.line === "belt"
    //     );
    //   };

    // // Filter the features
    // const equator = beanbeltData.features.filter(filter_equator);
    // const belt = beanbeltData.features.filter(filter_belt);

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
      // 'transition': {
      //         'duration': 5000, // Duration in milliseconds
      //         'delay': 1000, // Delay in milliseconds
      //       }
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
        map.loadImage('./images/smallbean.png', (error, image) => {
          if (error) throw error;
        map.addImage('small-bean', image);
        });
        
        map.addSource('pointSource', {
            type: 'geojson',
            data: beanbeltData
            
        });

        map.addSource('countries', {
            type: 'geojson',
            data: countriesData
        });

        const stops =  [[5, '#ffffff'],
        [20, '#ece0d1'],
        [80, '#dbc1ac'],
        [320, '#967259'],
        [1280, '#634832'],
        [5120, '#38220f']]
  
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

        map.addLayer({
          id: 'belt',
          type: 'fill',
          source: 'pointSource', // Use the same source as before
          filter: ['==', '$type', 'Polygon'],
          paint: {
            'fill-color': '#508571', // Change the color as needed
            'fill-opacity': 0.2, // Adjust the opacity as needed
            'fill-opacity-transition': {
              'duration': 6000, // Duration in milliseconds
              'delay': 2000, // Delay in milliseconds
            },
          }
        });
        
        map.addLayer({
          id: 'equator',
          type: 'line',
          source: 'pointSource',
          filter: ['==', ['get', 'line'], 'equator'],
          'layout': {},
          'paint': {
            'line-color': '#3E3E3E',
            'line-width': 0,
          }
        });

        // map.addLayer({
        //   id: 'equator',
        //   type: 'symbol',
        //   source: 'pointSource',
        //   filter: ['==', '$type', 'Point'],
        //   layout: {
        //     'icon-image': 'small-bean',
        //     'icon-size': 0.08, // Adjust the icon size as needed
        //     'icon-allow-overlap': true,
        //     'icon-ignore-placement': true,
        //   } 
        // });
        
        
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
  
  $: if (index === 2) {
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
    }
  
    .map.visible {
      opacity: 1;
      visibility: visible;
    }
  </style>
  
  