<script>
    import Scroller from "@sveltejs/svelte-scroller";
    import Map from "./Map.svelte";
    import Map1 from "./Map1.svelte";
    import Map1_1 from "./Map1-1.svelte";
    import MapBelt from "./MapBelt.svelte";
    import MapMigration from "./MapMigration.svelte";
    import Background from "./Background.svelte";
    import Quiz from "./Quiz.svelte";
    import { geoMercator } from "d3-geo";
    // import Graph from "./Graph.svelte";
    import { fade, fly } from 'svelte/transition';
    import Map1_1TempChange from "./Map1-1_temp_change.svelte";

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

    <Map1_1 bind:geoJsonToFit {index} /> 

    <Map1_1TempChange bind:geoJsonToFit {index} />

    <MapMigration {index} />
    
  
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

    <section class="intro" >
      <div class="textbox">
        <h1 >Hi there, how's the coffee?</h1>
        Have you ever wondered where your coffee comes from? Let's take a step back.
        <br />
        <br />
        <button on:click={scrollToNextPage}>
          <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
        </button>
      </div>
      
    </section>

    <section>
      
      [enter some kind of fancy transition]
      <br />
      <br />
      <br />
      <img class="smallbean" src="./images/smallbean-hor.png" alt="coffeebean" width="50" />
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      <img class="smallbean" src="./images/smallbean-hor.png" alt="coffeebean" width="50"/>
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
    </section>

    <section class="aboutCoffee">
      <Quiz />
   
    </section>

    <section class="chapterOne">
      <div class="textbox">
        Here’s a map of the world. And these are the countries that produce coffee.
        <br />
        <br />
        Hover over each country to see how much coffee they produce.

        <br />
        <br />
        Do you notice a pattern?
      </div>
    </section>
    <section class="beanbelt">
      <div class="textbox">
        Coffee trees grow best in a region called "The Bean Belt," which is located near the Equator, between latitudes 23.5 degrees North and 23.5 degrees South. 
        <br />
        <br />
        <br />
        The coffee belt passes through some 70 countries, which have tropical climates that provide rich environments that are perfect for growing coffee.
      </div>
  
    </section>
    

    <section class="chapterTwo" transition:fade>
      <div class="textbox"> 
        Did you know that the Northern Triangle, a region that produces x% of the world's coffee, is facing challenges that threaten the future of coffee production?
      </div>
      
    </section>
    
    <section class="farmerStory">
      <div class="container">
        <div >
          <img class="farmerimage" src="./images/farmer.png" alt="farmer" />
        </div>
        <div class="farmertext">
          Meet Juan, <br />a smallholder coffee farmer in Honduras.
        </div>
      </div>
    </section>

    <section >
      <div class="textbox">
        Continue Farmer story
      </div>
    </section>

    <section class="chapterThree">
      <div class="textbox">
        <h1>Climate change in Northern Triangle</h1>
        Change in average temperature between 2010 and 2020
      </div>
    </section>
    <section class="chapterThree">
      <div class="textbox">
        <h1>Natural disasters in Norther Triangle</h1>
        Mapping the drought risk in Honduras
      </div>

    </section>
    <section class="chapterThree">
      <div class="textbox">
        Coffee production in Northern Triangle
      </div>
    </section>
<<<<<<< HEAD
    <section class="chapterThree">
      Coffee production in Northern Triangle
      
    </section>
=======
>>>>>>> 5b9aa7ca7f1b37be0b5d0036c829d95bea7ccbe9
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
      Learned something new? Go out there and spill the beans!
      <br />
      Click the bean to learn more.
      <br />
      <button>
        <img class="bean" src="./images/coffeebean.png" alt="coffeebean" width="500"/>
      </button>

      <br />
      <br />
      <br />
      <h3>References</h3>
      
      USDA coffee data<br />
      International Coffee Organization (ICO) <br />
      United Nation Population Division <br />
      World Food Programme <br />
      GADM Data
      

      <p class="credit">
        Copyright info
      </p>
    </section>
  </div>
</Scroller>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');

    .background {
      width: 105%; /* to get rid of the weird margin */
      height: 100vh;
      position: relative;
      top: 0px; 
      left: -8px; /* to get rid of the weird margin */
      /* pointer-events: fill; */
    }
  
    .foreground {
      width: 95%;
      margin: 0 auto;
      height: auto;
      position: relative;
    }
  
    /* .progress-bars {
      position: absolute;
      background: rgba(170, 51, 120, 0.2);
      visibility: visible;
    } */
  
    section {
      height: 100vh;
      background-color: rgba(255, 255, 255, 0); 
      max-width: 33%; /* adjust at will */
      color: black;
      padding: 1em;
      /* margin: 1em 0 2em 45em; */
      margin-left: auto;
      margin-right: 0px;
      text-align: center;
      font-family: 'Poppins', sans-serif;
      font-size: 18px;
      line-height: 1.7;
    }

    .intro {
      position: relative;
    }

    .textbox {
      background-color: rgba(255, 255, 255, 0.8); 
      padding: 2em 2em;
      position: relative;
      top: 50%; /* vertically center */
      -ms-transform: translateY(-50%); /* vertically center */
      transform: translateY(-50%); /* vertically center */
    }
    .aboutCoffee {
      height: 90vh;
      max-width: 750px; /* adjust at will */
      padding: 3em 2em 3em 2em;
      margin: 15em auto 5em;
    }

    .farmerStory {
      height: 120vh;
      max-width: 100%; /* adjust at will */
      padding: 5em 3em;
      margin: 2em 1em; 
      /* background-color: rgba(255, 255, 255, 0.65);  */
    }

    .container {
      display: flex;
      align-items: center;
      justify-content: center
    }

    .farmerimage {
      max-width: 70%;
      max-height: 70%;
    }
    .farmertext {
      font-size: 28px;
      padding-left: 20px;
      font-family: 'Noto Serif', serif;
      font-style: italic;
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
      line-height: 1.7;
      margin: 1em;
    }

    button {
      background-color: white;
      border-style: none;
    }

    h1 {
      margin: 8px 0 20px 0;
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