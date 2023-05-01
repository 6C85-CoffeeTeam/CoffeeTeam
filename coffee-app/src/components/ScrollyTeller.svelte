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
    
    <MapBelt bind:geoJsonToFit {index} />
    <!-- <Graph {index} {width} {height} {projection} /> -->

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
    <section class="intro">
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
        <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      </button>
      
    </section>

    <section class="intro">
      
      [enter some kind of fancy transition]
      <br/>
      <br />
      <br />
      <img class="smallbean" src="./images/smallbean-hor.png" alt="coffeebean" width="50"/>
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      <img class="smallbean" src="./images/smallbean-hor.png" alt="coffeebean" width="50"/>
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
    </section>

    <section class="aboutCoffee">
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      <h3>Coffee Fun Fact #1</h3>
      <p>
        Coffee's flavor and quality depend on factors like plant type, soil chemistry, climate conditions such as rainfall and sunshine, altitude, and minimal pests or diseases that affect the plants.
      </p> 
        <br />
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      <h3>Coffee Fun Fact #2</h3>
      <p>
        The optimal temperature range of the Coffea arabica tree—source of 70% of the world's coffee—is 64°–70°F (18°C–21°C), while it can tolerate up to 73°F (24°C). 
        <!-- Arabica coffee, which is of higher quality, prefers high altitudes and nutrient-rich soil, while Robusta coffee can tolerate lower altitudes and higher temperatures. -->
      </p>
        <br />
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      <h3>Coffee Fun Fact #3</h3>
      <p>
        Generally, coffee needs 1500-2500mm annual rainfall, spread evenly, with a dry season under three months. However, some plants tolerate different conditions depending on the growing region.
      </p>
      <br />
      <br />
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      <br />
      <br />
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      <br />
      <br />
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      <br />
      <br />
      Now it's your turn!
    </section>
    <section class="aboutCoffee">
      <img class="coffeegame" src="./images/coffeegame_result.png" alt="coffeegame" width="750"/>
      <br />

    </section>

    <section class="chapterOne">
      Here’s a map of the world. And these are the countries that produce coffee.
      <br />
      <br />
      Hover over each country to see how much coffee they produce.

      <br />
      <br />
      Do you notice a pattern?
    </section>
    <section class="beanBelt">
      Coffee trees grow best in a region called "The Bean Belt," which is located near the Equator, between latitudes 23.5 degrees North and 23.5 degrees South. 
      <br />
      <br />
      <br />
      The coffee belt passes through some 70 countries, which have tropical climates that provide rich environments that are perfect for growing coffee.
    </section>
    

    <section class="chapterTwo" transition:fade>
      <br />
        <br />
        <br />
      Let’s zoom into a region in Central America called the “Northern Triangle.” 
      <br />
      <br />
      <br />
      This region includes: <br />Guatemala, <br />Honduras <br />and <br />El Salvador. 
    </section>
    <section class="farmerStory">
      
      <img class="farmer" src="./images/farmer.png" alt="farmer" width="600"/>
      <br />
      <br />
      Meet Juan, <br />a smallholder coffee farmer in the Huehuetenango region in Guatemala.
    </section>
    <section class="farmerStory">
      Continue Farmer story
    </section>
    <section class="chapterThree">
      Climate change in Northern Triangle
    </section>
    <section class="chapterThree">Natural disasters in Norther Triangle</section>
    <section class="chapterThree">Coffee production in Northern Triangle</section>
    <section class="flowmap">
      <h1>Migration from the Northern Triangle</h1>
      <p>Click the "play" button on the bottom to see how migration flow changes over the years.
        <br />
        Hover outside the map to continue scrolling down.</p>
      <iframe 
        width="100%" 
        height="600"
        title = "flowmap" 
        src="https://flowmap.blue/1ODcincYj0MjnBWdE6v2FFHltR2JCNV6buBM3aQlLhc0?v=23.301426%2C-92.632810%2C4.43%2C0%2C0&a=1&as=1&b=1&bo=84&c=0&ca=0&cz=4&d=0&fe=1&lt=0&lfm=ALL&t=19900101T000000%2C19960101T000000&col=BuGn&f=19" 
        frameborder="0" 
        allowfullscreen
        ></iframe>
        <br />
    </section>
    
    <section class="ending">
      Learned something new? Go out there an spill the beans!
      <br />
      Click the bean to learn more.
      <br />
      <button>
        <img class="bean" src="./images/coffeebean.png" alt="coffeebean" width="500"/>
      </button>

      <br />
      <p class="credit">
        Copyright info
      </p>
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
      background-color: rgba(255, 255, 255, 0); 
      /* color: white; */
      /* outline: magenta solid 3px; */
      max-width: 100%; /* adjust at will */
      color: black;
      padding: 3em 2em;
      margin: 1em 0 2em 45em;
      text-align: center;
      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      line-height: 1.65;
    }

    .aboutCoffee {
      height: 90vh;
      max-width: 750px; /* adjust at will */
      padding: 3em 2em 3em 2em;
      margin: 15em auto 5em;
    }

    .farmerStory {
      height: 120vh;
      max-width: 80%; /* adjust at will */
      padding: 5em 2em;
      margin: 2em auto; 
      background-color: rgba(255, 255, 255, 0.65); 
    }
    .flowmap {
      height: 80vh;
      max-width: 900px; /* adjust at will */
      padding: 0;
      margin: 0 auto;
    }
    .ending {
      height: 80vh;

      max-width: 750px; /* adjust at will */
      padding: 10em 0 0 0;
      margin: 10em auto;

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

    .bean {
      margin: 2em auto;
    }

    .credit {
      font-size: 12px;
      color: gray;
      margin: 13em 0 0 0;
    }
  </style>