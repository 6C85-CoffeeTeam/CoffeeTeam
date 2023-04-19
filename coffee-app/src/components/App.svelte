<script>
    import * as d3 from "d3";
    import GlobalMap from "./GlobalMap.svelte";
    import NorthernTriangleClimate from "./NorthernTriangleClimate.svelte";
    let GlobalMapDataset = [];
    let NorthernTriangleClimateDataset = [];
    // note from Austin: for some reason I can't get d3.json to load local json files. So I have been forced
    // to pull from a url that points to our file in github. Thus, to see edits to the data reflected in your local
    // web app, you'll need to push to github and wait a couple of minutes. Would be nice if we could fix this.
    d3.json(
       "https://raw.githubusercontent.com/austinjstromme/CoffeeTeam/main/coffee-app/data/world.geojson"
    ).then((data) => {
      GlobalMapDataset  = data.features;
    });
    d3.json(
       "https://raw.githubusercontent.com/austinjstromme/CoffeeTeam/main/coffee-app/data/northerntriangleclimate.geojson"
    ).then((data) => {
      NorthernTriangleClimateDataset  = data.features;
    });
  </script>
  
  <main>
    <title>
      CoffeeApp
    </title>
    <h1>
      The coffee belt: global coffee production is concentrated in the tropics
    </h1>
      <GlobalMap {GlobalMapDataset} />
      <h1>
        Climate and coffee production within the northern triangle
      </h1>
      <NorthernTriangleClimate {NorthernTriangleClimateDataset} />
  </main>

  <style>
    h1 {
      text-align: center;
      font-size: 25px;
    }
  </style>