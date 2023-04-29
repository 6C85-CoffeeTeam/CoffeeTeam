<script>
    import Scroller from "@sveltejs/svelte-scroller";
    import Map from "./Map.svelte";
    import Map1 from "./Map1.svelte";
    import { geoMercator } from "d3-geo";
  
    let count, index, offset, progress;
    let width, height;

    let geoJsonToFit = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [1, 0],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 1],
        },
      },
    ],
  };

  $: projection = geoMercator().fitSize([width, height], geoJsonToFit);
</script>

<Scroller
  top={0.0}
  bottom={1}
  threshold={0.5}
  bind:count
  bind:index
  bind:offset
  bind:progress
>
  <div 
    class="background" 
    slot="background"
    bind:clientWidth={width} 
    bind:clientHeight={height}
    >
    <Map {index} />
    <Map1 {index} />

    <div class="progress-bars">
        <p>current section: <strong>{index + 1}/{count}</strong></p>
        <progress value={count ? (index + 1) / count : 0} />
  
        <p>offset in current section</p>
        <progress value={offset || 0} />
  
        <p>total progress</p>
        <progress value={progress || 0} />
      </div>
    </div>

  <div class="foreground" slot="foreground">
    <section>Intro 1    </section>
    <section>Intro 2</section>
    <section>Global Coffee Productiont</section>
    <section>Global Bean Belt</section>
    <section>Northern Triangle</section>
    <section>Farmer story</section>
    <section>Coffee production in Northern Triangle</section>
    <section>Climate change in Northern Triangle</section>
    <section>Natural disasters in Norther Triangle</section>
    <section>Migration from Norther Triangle</section>
    <section>Outro</section>
  </div>
</Scroller>

<style>
    .background {
      width: 100%;
      height: 100vh;
      position: relative;
      top: -15px; /**To get rid of a weird gap on top of background*/
      outline: green solid 0px;
      /* pointer-events: fill; */
    }
  
    .foreground {
      width: 50%;
      margin: 0 auto;
      height: auto;
      position: relative;
      /* outline: red solid 3px; */
    }
  
    /* .progress-bars {
      position: absolute;
      background: rgba(170, 51, 120, 0.2);
      visibility: visible;
    } */
  
    section {
      height: 80vh;
      background-color: rgba(0, 0, 0, 0.2); /* 20% opaque */
      /* color: white; */
      /* outline: magenta solid 3px; */
      text-align: center;
      max-width: 750px; /* adjust at will */
      color: black;
      padding: 1em;
      margin: 0 0 2em 0;
    }
  </style>