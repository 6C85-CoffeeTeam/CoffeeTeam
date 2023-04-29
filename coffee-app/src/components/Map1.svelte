<script>
    import mapboxgl from "mapbox-gl";
    import { onMount } from "svelte";
    export let index;
    export let geoJsonToFit;
  
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZXVuaGFlMTU3MCIsImEiOiJjbGdsNGlzMGIwMGpqM3BtZXZ3MHRzZWM2In0.VyD5HQxUxjsF9gkC7Z5TgQ";
  
    let container;
    let map;
  
    let zoomLevel;
  
    function updateZoomLevel() {
      const screenWidth = window.innerWidth;
      zoomLevel = screenWidth <= 600 ? 5 : 6.5; // Adjust these values as needed
    }
  
    function handleResize() {
      updateZoomLevel();
      map.setZoom(zoomLevel);
    }
  
    onMount(() => {
      updateZoomLevel();
      map = new mapboxgl.Map({
        container,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-89.24528748786891,15.367303607422386],
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
  
  $: if (index > 3 && index <10) {
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
  
  