<script>
    import * as d3 from "d3";
    import GlobalMap from "./GlobalMap.svelte";
    let dataset = [];
    // note from Austin: for some reason I can't get d3.json to load local json files. So I have been forced
    // to pull from a url that points to our file in github. Thus, to see edits to the data reflected in your local
    // web app, you'll need to push to github and wait a couple of minutes. Would be nice if we could fix this.
    d3.json(
       "https://raw.githubusercontent.com/austinjstromme/CoffeeTeam/main/coffee-app/data/world.geojson"
    ).then((data) => {
      dataset = data.features;

      console.log(data.features)
    });
    const width = 1200,
      height = 600;
  </script>
  
  <main>
    <svg {width} {height}>
      <GlobalMap {dataset} />
    </svg>
  </main>