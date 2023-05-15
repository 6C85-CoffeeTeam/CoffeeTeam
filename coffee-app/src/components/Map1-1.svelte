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

  let hondurasDroughtData;

  let zoomLevel;

  const norTriData = {"type":"FeatureCollection","features":[ 
    {"type":"Feature","properties":{"name":"Honduras", "coffee":5931},"geometry":{"type":"Polygon","coordinates":[[[-87.316654,12.984686],[-87.489409,13.297535],[-87.793111,13.38448],[-87.723503,13.78505],[-87.859515,13.893312],[-88.065343,13.964626],[-88.503998,13.845486],[-88.541231,13.980155],[-88.843073,14.140507],[-89.058512,14.340029],[-89.353326,14.424133],[-89.145535,14.678019],[-89.22522,14.874286],[-89.154811,15.066419],[-88.68068,15.346247],[-88.225023,15.727722],[-88.121153,15.688655],[-87.901813,15.864458],[-87.61568,15.878799],[-87.522921,15.797279],[-87.367762,15.84694],[-86.903191,15.756713],[-86.440946,15.782835],[-86.119234,15.893449],[-86.001954,16.005406],[-85.683317,15.953652],[-85.444004,15.885749],[-85.182444,15.909158],[-84.983722,15.995923],[-84.52698,15.857224],[-84.368256,15.835158],[-84.063055,15.648244],[-83.773977,15.424072],[-83.410381,15.270903],[-83.147219,14.995829],[-83.489989,15.016267],[-83.628585,14.880074],[-83.975721,14.749436],[-84.228342,14.748764],[-84.449336,14.621614],[-84.649582,14.666805],[-84.820037,14.819587],[-84.924501,14.790493],[-85.052787,14.551541],[-85.148751,14.560197],[-85.165365,14.35437],[-85.514413,14.079012],[-85.698665,13.960078],[-85.801295,13.836055],[-86.096264,14.038187],[-86.312142,13.771356],[-86.520708,13.778487],[-86.755087,13.754845],[-86.733822,13.263093],[-86.880557,13.254204],[-87.005769,13.025794],[-87.316654,12.984686]]]},"id":"HND"},
    {"type":"Feature","properties":{"name":"Guatemala", "coffee":3606},"geometry":{"type":"Polygon","coordinates":[[[-90.095555,13.735338],[-90.608624,13.909771],[-91.23241,13.927832],[-91.689747,14.126218],[-92.22775,14.538829],[-92.20323,14.830103],[-92.087216,15.064585],[-92.229249,15.251447],[-91.74796,16.066565],[-90.464473,16.069562],[-90.438867,16.41011],[-90.600847,16.470778],[-90.711822,16.687483],[-91.08167,16.918477],[-91.453921,17.252177],[-91.002269,17.254658],[-91.00152,17.817595],[-90.067934,17.819326],[-89.14308,17.808319],[-89.150806,17.015577],[-89.229122,15.886938],[-88.930613,15.887273],[-88.604586,15.70638],[-88.518364,15.855389],[-88.225023,15.727722],[-88.68068,15.346247],[-89.154811,15.066419],[-89.22522,14.874286],[-89.145535,14.678019],[-89.353326,14.424133],[-89.587343,14.362586],[-89.534219,14.244816],[-89.721934,14.134228],[-90.064678,13.88197],[-90.095555,13.735338]]]},"id":"GTM"},
    {"type":"Feature","properties":{"name":"El Salvador", "coffee":661},"geometry":{"type":"Polygon","coordinates":[[[-87.793111,13.38448],[-87.904112,13.149017],[-88.483302,13.163951],[-88.843228,13.259734],[-89.256743,13.458533],[-89.812394,13.520622],[-90.095555,13.735338],[-90.064678,13.88197],[-89.721934,14.134228],[-89.534219,14.244816],[-89.587343,14.362586],[-89.353326,14.424133],[-89.058512,14.340029],[-88.843073,14.140507],[-88.541231,13.980155],[-88.503998,13.845486],[-88.065343,13.964626],[-87.859515,13.893312],[-87.723503,13.78505],[-87.793111,13.38448]]]},"id":"SLV"},
  ]}

  d3.json(
    "https://raw.githubusercontent.com/6C85-CoffeeTeam/CoffeeTeam/main/coffee-app/src/data/honduras_drought_risk.geojson"
  ).then((data) => {
    hondurasDroughtData = data;
  });

  // d3.json(
  //   "https://raw.githubusercontent.com/6C85-CoffeeTeam/CoffeeTeam/main/coffee-app/src/data/honduras_drought_risk.geojson"
  // ).then((data) => {
  //   hondurasDroughtData = data;
  // });

  function updateZoomLevel() {
    const screenWidth = window.innerWidth;
    zoomLevel = screenWidth <= 600 ? 5 : 6.3; // Adjust these values as needed
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
      center: [-85.0,15.368649575406508],
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

    map.on("load", () => {
      // hideLabelLayers();
      updateBounds();
      map.on("zoom", updateBounds);
      map.on("drag", updateBounds);
      map.on("move", updateBounds);
    });

    map.on("load", () => {
    map.addSource('northernTriangle', {
          type: 'geojson',
          data: norTriData
      });

    map.addSource('hondurasDrought', {
          type: 'geojson',
          data: hondurasDroughtData
      });

      map.addLayer({
          id: 'country-fills',
          type: 'fill',
          source: 'northernTriangle',
          // filter: ['==', ['get', 'name'], 'Guatemala'],
          layout: {},
          paint: {
          'fill-color': '#627BC1', 
          'fill-opacity': 0
          }
      });


      map.addLayer({
          'id': 'country-borders',
          'type': 'line',
          'source': 'northernTriangle',
          'layout': {},
          'paint': {
          'line-color': '#627BC1',
          'line-width': 0
          }
        });

      map.addLayer({
          'id': 'HondurasDroughtLow',
          filter: ['==', ['get', 'Dr_Text'], 'Low'],
          'type': 'fill',
          'source': 'hondurasDrought',
          'layout': {},
          'paint': {
            'fill-color': '#A59555',
            'fill-opacity': 0.4
          }
        });

        map.addLayer({
          'id': 'HondurasDroughtMedium',
          filter: ['==', ['get', 'Dr_Text'], 'Medium'],
          'type': 'fill',
          'source': 'hondurasDrought',
          'layout': {},
          'paint': {
            'fill-color': '#DD9d12',
            'fill-opacity': 0.4
          }
        });

        map.addLayer({
          'id': 'HondurasDroughtHigh',
          filter: ['==', ['get', 'Dr_Text'], 'High'],
          'type': 'fill',
          'source': 'hondurasDrought',
          'layout': {},
          'paint': {
            'fill-color': '#E12D02',
            'fill-opacity': 0.4
          }
        });
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

$: if (index === 10 ) {
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

