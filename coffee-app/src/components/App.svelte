<script>
    import * as d3 from "d3";
    import GlobalMap from "./GlobalMap.svelte";
    let dataset = [];
    d3.json(
       "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    ).then((data) => {
      dataset = data.features;
    });
    const width = 1200,
      height = 600;
  </script>
  
  <main>
    <svg {width} {height}>
      <GlobalMap {dataset} />
    </svg>
  </main>