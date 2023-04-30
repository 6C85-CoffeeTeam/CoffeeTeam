<script>
    import Scroller from "@sveltejs/svelte-scroller";
    import Map from "./Map.svelte";
    import Map1 from "./Map1.svelte";
    import MapBelt from "./MapBelt.svelte";
    import MapMigration from "./MapMigration.svelte";
    import Background from "./Background.svelte";
    import { geoMercator } from "d3-geo";
    // import Graph from "./Graph.svelte";
    import { fade, fly } from 'svelte/transition';

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

  function scrollToNextPage() {
    const nextPagePosition = window.innerHeight + window.pageYOffset;
    window.scrollTo({ top: nextPagePosition, behavior: "smooth" });
  }
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

    <Background {index} />

    <Map bind:geoJsonToFit {index} />
    <!-- <Graph {index} {width} {height} {projection} /> -->
    <MapBelt bind:geoJsonToFit {index} />

    <Map1 bind:geoJsonToFit {index} />

    <MapMigration bind:geoJsonToFit {index} />
    
  
    <!-- <div class="progress-bars">
        <p>current section: <strong>{index + 1}/{count}</strong></p>
        <progress value={count ? (index + 1) / count : 0} />
  
        <p>offset in current section</p>
        <progress value={offset || 0} />
  
        <p>total progress</p>
        <progress value={progress || 0} />
      </div> -->
    </div>

  <div class="foreground" slot="foreground">
    <section class="zero">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      Hi there, how's the coffee?
      <br />
      <br />
      Have you ever wondered where your coffee comes from? Let's take a step back.
      <br />
      <br />
      <button on:click={scrollToNextPage}>
        <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
          <path d="M 10,20 L 25,40 L 40,20 Z" fill="black" />
        </svg>
      </button>
      
    </section>

    <section class="one">[enter some kind of fancy transition]</section>
    <section>
      Here’s a map of the world. And these are the countries that produce coffee.
      <br />
      <br />
      Hover over each country to see how much coffee they produce.

      <br />
      <br />
      Do you notice a pattern?
    </section>
    <section class="two">
      Coffee trees grow best in a region called "The Bean Belt," which is located near the Equator, between latitudes 25 degrees North and 30 degrees South. 
      <br />
      <br />
      <br />
      The coffee belt passes through some 70 countries, which have tropical climates that provide rich environments that are perfect for growing coffee.
    </section>
    [Provide some cool coffee plant visuals?]
    <section class="three">
      Coffee's flavor and quality depend on factors like plant type, soil chemistry, climate conditions such as rainfall and sunshine, altitude, and minimal pests or diseases that affect the plants.
      <br />
      <br />
      <br />
      The optimal temperature range of the Coffea arabica tree—source of 70% of the world's coffee—is 64°–70°F (18°C–21°C), while it can tolerate up to 73°F (24°C). Arabica coffee, which is of higher quality, prefers high altitudes and nutrient-rich soil, while Robusta coffee can tolerate lower altitudes and higher temperatures.
      <br />
      <br />
      <br />
      Optimal rainfall for coffee growth varies by plant type and location. Generally, coffee needs 1500-2500mm annual rainfall, spread evenly, with a dry season under three months. However, some plants tolerate different conditions depending on the growing region.
    </section>
    <section class="four">
      Let’s zoom into a region in Central America called the “Northern Triangle.” 
      <br />
      <br />
      <br />
      This region includes: <br />Guatemala, <br />Honduras <br />and <br />El Salvador. 
    </section>
    <section class="five">
      Meet Juan, a smallholder coffee farmer in the Huehuetenango region in Guatemala.
    </section>
    <section class="six">
      Continue Farmer story
    </section>
    <section class="seven">
      Coffee production in Northern Triangle
    </section>
    <section class="eight">Climate change in Northern Triangle</section>
    <section class="nine">Natural disasters in Norther Triangle</section>
    <section class="ten">Migration from Norther Triangle</section>
    <p>Click the "play" button to see how migration flow changes over the years.
      <br />
      Hover outside the map to continue scrolling down.</p>
    <iframe 
      width="100%" 
      height="700"
      title = "flowmap" 
      src="https://flowmap.blue/1ODcincYj0MjnBWdE6v2FFHltR2JCNV6buBM3aQlLhc0?v=23.301426%2C-92.632810%2C4.43%2C0%2C0&a=1&as=1&b=1&bo=84&c=0&ca=0&cz=4&d=0&fe=1&lt=0&lfm=ALL&t=19900101T000000%2C19960101T000000&col=BuGn&f=19" 
      frameborder="0" 
      allowfullscreen
      ></iframe>
      
      <br />
    <section class="eleven">
      What are you waiting for? Take action now!
    </section>
  </div>
</Scroller>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

    .background {
      width: 105%; /* to get rid of the weird margin */
      height: 100vh;
      position: relative;
      top: 0px; 
      left: -8px; /* to get rid of the weird margin */
      outline: green solid 0px;
      /* pointer-events: fill; */
    }
  
    .foreground {
      width: 90%;
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
      background-color: rgba(0, 0, 0, 0); 
      /* color: white; */
      /* outline: magenta solid 3px; */
      max-width: 750px; /* adjust at will */
      color: black;
      padding: 5em 0;
      margin: 1em 0 2em 54em;
      text-align: center;
      font-family: 'Poppins', sans-serif;
      line-height: 1.65;
    }
    p {
      text-align: center;
      font-family: 'Poppins', sans-serif;
      line-height: 1.65;
      margin: 1em;
    }

    button {
      background-color: white;
      border-style: none;
    }
  </style>