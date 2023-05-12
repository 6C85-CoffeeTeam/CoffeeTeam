<script>
    import Scroller from "@sveltejs/svelte-scroller";
    import Map from "./Map.svelte";
    import Map1 from "./Map1.svelte";
    import Map1_1 from "./Map1-1.svelte";
    import MapBelt from "./MapBelt.svelte";
<<<<<<< Updated upstream
    import MapMigration from "./MapMigration.svelte";
=======
    // import MapMigration from "./MapMigration.svelte";
    import ChartCoffee from "./Chart_coffee.svelte";
>>>>>>> Stashed changes
    import Background from "./Background.svelte";
    import Quiz from "./Quiz.svelte";
    import { geoMercator } from "d3-geo";
    // import Graph from "./Graph.svelte";
    import { fade, fly } from 'svelte/transition';
    // import { weddings } from "../data/weddings.js";
    import { coffeeProduction } from "../data/coffee-production.js";
    import {tooltip} from './tooltip';

<<<<<<< Updated upstream
=======
    // let weddings_data = [];
    // weddings.forEach((element) =>
    //     weddings_data.push({
    //         index: element["Year"],
    //         size: element["Civil"],
    //     })
    // );

    let coffee_production_data = [];
    coffeeProduction.forEach((element) =>
        coffee_production_data.push({
            index: element["Year"],
            size: element["Production"],
            country: element["Country"],
        })
    );

>>>>>>> Stashed changes
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

    <section class="intro" >
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1 >Hi there, how's the coffee?</h1>
      Have you ever wondered where your coffee comes from? Let's take a step back.
      <br />
      <br />
      <button on:click={scrollToNextPage}>
        <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      </button>
<<<<<<< Updated upstream
      
=======
      <p style:font-size="14px">Click the latte!</p>
    </div>
>>>>>>> Stashed changes
    </section>

    <section class="intro">
      
      [enter some kind of fancy transition]
      <br />
      <br />
      <br />
      <img class="smallbean" src="./images/smallbean-hor.png" alt="coffeebean" width="50" />
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      <img class="smallbean" src="./images/smallbean-hor.png" alt="coffeebean" width="50"/>
      <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <img class="smallbean" src="./images/coffeeplant.jpg" alt="coffeeplant" width="300"/>
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
      <br />
    </section>
    <section class="aboutCoffee">
      <Quiz />
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
    

<<<<<<< Updated upstream
    <section class="chapterTwo" transition:fade>
      <br />
        <br />
        <br />
      Let’s zoom into a region in Central America called the “Northern Triangle.” 
      <br />
      <br />
      <br />
      This region includes: <br />Guatemala, <br />Honduras <br />and <br />El Salvador. 
=======
    <section class="quote">
      <div class="textbox"> 
        <p>
          Warming climate may affect coffee in many ways, including reduced growing area, increased pests, and loss of quality.
        </p> 
        <p>
          While these changes would be inconvenient for coffee drinkers, they could be catastrophic for coffee growers.
        </p> 
      </div>
    </section>

    <section class="chapterTwo">
      <div class="textbox"> 
        <p>
          Let's zoom into a region named the <span class="emphasize">Northern Triangle</span>, which includes Guatemala, Honduras, and El Salvador.
        </p>
        <p>
          <span class="emphasize">1.3 million</span> people in this region grow coffee for a living, and their livelihoods are increasingly impacted by climate change. 
          <a class="source" href="https://www.ipcc.ch/site/assets/uploads/2018/02/WGIIAR5-Chap27_FINAL.pdf" target="_blank" rel="noopener noreferrer">[1]</a>,
          <a class="source" href="https://crsreports.congress.gov/product/pdf/IF/IF11151/7" target="_blank" rel="noopener noreferrer">[2]</a>.
        </p>

      </div>
    </section>
    <section>
      <div class="textbox" transition:fade="{{duration: 5000}}"> 
        <p>
          Rising temperatures and heavy rain driven by climate change has caused a <span class="emphasize">severe coffee rust outbreak</span> in Central America since 2012. 
        </p>
        <p>Unlike the outbreaks in the 1970s and 1980s, which were limited to warm, low altitudes, the new wave of coffee rust spread quickly to high altitudes.</p>

        <p>
          This affected over <span class="emphasize">55%</span> of the region's coffee farms and left around <span class="emphasize">350,000</span> people jobless.
        </p>

      </div>
>>>>>>> Stashed changes
    </section>
    
    <section class="farmerStory">
      <div class="container">
        <div class="farmertext">
          Meet Juan, <br />a smallholder coffee farmer in Honduras.
        </div>
        <div class="farmerimage">
          <img class="farmer" src="./images/farmer.png" alt="farmer" />
        </div>
      </div>
    </section>

    <section class="farmerStory">
      Continue Farmer story
    </section>
    <section class="chapterThree">
<<<<<<< Updated upstream
      Climate change in Northern Triangle
    </section>
    <section class="chapterThree">Natural disasters in Norther Triangle</section>
    <section class="chapterThree">Coffee production in Northern Triangle</section>
=======
      <div class="textbox">
        <h1>Natural disasters in Norther Triangle</h1>
        <p>
          Mapping the drought risk in Honduras
          
        </p>
        <p>Hurricanes in the past few years</p>
      </div>

    </section>
    <section class="quote">
      <div class="textbox">
        <p>
          "When coffee is not doing well, that's when you see big migrations from Honduras, El Salvador, Guatemala, Nicaragua."
        </p>
        <em>– René León-Gómez, executive secretary of PROMECAFE</em>

      </div>
    </section>

    <section class="graph">


      <h2 >Coffee production in Northern Triangle</h2>
      <ChartCoffee bind:data={coffee_production_data}/>

  </section>
>>>>>>> Stashed changes
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
      <br />
      <br />
      <h3>References</h3>
      
      USDA coffee data<br />
      International Coffee Organization (ICO) <br />
      United Nation Population Division <br />
      World Food Programme
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
      line-height: 1.7;
    }

<<<<<<< Updated upstream
    .aboutCoffee {
      height: 90vh;
      max-width: 750px; /* adjust at will */
      padding: 3em 2em 3em 2em;
      margin: 15em auto 5em;
=======
    .intro {
      height: 70vh;
      max-width: 100%; /* adjust at will */
      padding: 5em 3em;
      margin: 2em 1em; 
    }

    .intro .textbox {
      background-color: rgba(255, 255, 255, 0); 
      padding: 2em 2em;
      /* position: relative; */
      top: 40%; /* vertically center */
    }
    .intro .latte {
      margin: 0 0 0 50px;
    }
    .intro .latte:hover {
      filter: drop-shadow(8px 8px 8px #848484);
      text-align: center;
      margin: 0 0 0 35px;
    }
    .textbox {
      background-color: rgba(255, 255, 255, 0.8); 
      padding: 2em 2em;
      position: relative;
      top: 50%; /* vertically center */
      -ms-transform: translateY(-50%); /* vertically center */
      transform: translateY(-50%); /* vertically center */
      margin: 3em auto;
    }

    .textbox .emphasize {
      font-weight: 800;
      color:rgb(185, 48, 27);
      font-size: larger;
      display: inline;
    }

    .quote {
      height: 70vh;
      max-width: 70%; /* adjust at will */
      padding: 5em 3em;
      margin: 0 auto;
    }

    .quote .textbox {
      background-color: rgba(255, 255, 255, 0.8); 
      padding: 3em;
      /* position: relative; */
      top: 50%; /* vertically center */
      text-align: center;
    }
    .coffeeQuiz {
      height: 100vh;
      max-width: 70%; /* adjust at will */
      padding: 0em;
      /* margin-left: 10px;
      margin-right: 10px; */
      margin: 0 auto;
      position: relative;
>>>>>>> Stashed changes
    }

    .farmerStory {
      height: 120vh;
      max-width: 80%; /* adjust at will */
      padding: 5em 3em;
      margin: 2em auto; 
      background-color: rgba(255, 255, 255, 0.65); 
    }

    .container {
      display: flex;
      align-items: center;
      justify-content: center
    }

    .farmer {
      max-width: 100%;
      max-height:100%;
    }
    .farmertext {
      font-size: 28px;
      padding-left: 20px;
      font-family: 'Noto Serif', serif;
      font-style: italic;
    }

    .graph {
        margin: 0 auto;
        max-width: 80%;
      
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

    .bean {
      margin: 2em auto;
    }

    .credit {
      font-size: 12px;
      color: gray;
      margin: 13em 0 0 0;
    }
  </style>