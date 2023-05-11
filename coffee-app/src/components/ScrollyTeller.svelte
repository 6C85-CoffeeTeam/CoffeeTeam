<script>
    import Scroller from "@sveltejs/svelte-scroller";
    import Map from "./Map.svelte";
    import Map1 from "./Map1.svelte";
    import Map1_1 from "./Map1-1.svelte";
    import Map1_1Coffee from "./Map1-1_coffee.svelte";
    import Map1_1TempChange from "./Map1-1_temp_change.svelte";
    import MapBelt from "./MapBelt.svelte";
    // import MapMigration from "./MapMigration.svelte";
    import Background from "./Background.svelte";
    import Quiz from "./Quiz.svelte";
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

    <!-- <Background {index} /> -->

    <Map bind:geoJsonToFit {index} />
    
    <MapBelt bind:geoJsonToFit {index} />

    <Map1 bind:geoJsonToFit {index} />

    <Map1_1Coffee bind:geoJsonToFit {index} />

    <Map1_1 bind:geoJsonToFit {index} /> 

    <Map1_1TempChange bind:geoJsonToFit {index} />

    <!-- <MapMigration {index} /> -->
    
  
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
        <p>Have you ever wondered where your coffee comes from? 
          <br />
          Let's take a step back.
        </p>
      
      <button on:click={scrollToNextPage}>
        <img class="latte" src="./images/latte.png" alt="coffee" width="500"/>
      </button>
      <p style:font-size="14px">Click the latte or scroll down</p>
    </div>
    </section>

    <!-- <section class="intro">
      <div class="textbox">
        <p>Actually, why don't we go all the way back, <br /> when coffee was just a little plant...</p>
        <p>
        <img class="smallbean" src="./images/smallbean-hor.png" alt="coffeebean" width="50" />
        <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
        <img class="smallbean" src="./images/smallbean-hor.png" alt="coffeebean" width="50"/>
        <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
        </p>
        <button style:font-size="14px" on:click={scrollToNextPage}>
          Click this or continue scrolling
        </button>
      </div>
    </section> -->

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
        Coffee trees grow best in a region called <span class="emphasize">"The Bean Belt"</span> which is located near the Equator, between latitudes 23.5 degrees North and 23.5 degrees South. 
        <br />
        <br />
        <br />
        The coffee belt passes through some <span class="emphasize">70 countries</span>, which have tropical climates that provide rich environments that are perfect for growing coffee.
      </div>
  
    </section>
    
    <section class="coffeeQuiz">
      <div>
        <Quiz />
      </div>       
      <!-- <button class="nextPageButtonText" on:click={scrollToNextPage} transition:fade>
        Or, jump to next section
      </button> -->
    </section>

    <section>
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
          Rising temperatures and heavy rain driven by climate change has caused a severe coffee rust outbreak in Central America since 2012. 
        </p>
        <p>Unlike the outbreaks in the 1970s and 1980s, which were limited to warm, low altitudes, the new wave of coffee rust spread quickly to high altitudes.</p>

        <p>
          This affected over <span class="emphasize">55%</span> of the region's coffee farms and left around <span class="emphasize">350,000</span> people jobless.
        </p>

      </div>
    </section>
    
    <section class="farmerStory">
      <div class="container">
        <div >
          <img class="farmerimage" src="./images/farmer.png" alt="farmer" />
        </div>
        <div class="farmertext-title">
          Meet Juan, <br />a smallholder coffee farmer in Honduras.
        </div>
      </div>
    </section>

    <section class="farmerStory" >
      <div class="farmertext-body">
        <p>
          "My family has been growing coffee for generations and I have been working on our farm ever since I was a kid. I am deeply connected to the land and the coffee we produce... 

        </p>
        <p>
          However, we have been struggling. Over the past few years, I have noticed significant changes in the climate that are affecting the coffee production and our daily lives."           
        </p>
        <img class="farmerimage" src="./images/farmer.png" alt="farmer" width="300" />
      </div>
    </section>

    <section class="chapterThree">
      <div class="textbox">
        <h1>Climate change in Northern Triangle</h1>
        <p>Change in average temperature between 2010 and 2020</p>
        

        <p>
          We have seen temperatures rise above 25 degrees during the day, which has caused the coffee plants to grow slowly, decreasing yield and quality.
        </p>
        <img class="farmerimage" src="./images/farmer.png" alt="farmer" width="300" />
      </div>
    </section>
    <section class="chapterThree">
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
    <section class="chapterThree">
      <div class="textbox">
        <h1>
          Coffee production in Northern Triangle
        </h1>
      </div>
    </section>
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
      <p>Learned something new? Go out there and spill the beans!</p>
      <p>Click the bean to learn more.</p>

      <button>
        <img class="bean" src="./images/coffeebean.png" alt="coffeebean" width="500"/>
      </button>

      <br />
      <br />
      <br />
      <h3>References</h3>
      
      <em>Datasets</em>
      <p>
        USDA coffee data<br />
        International Coffee Organization (ICO) <br />
        United Nation Population Division <br />
        World Food Programme <br />
        GADM.org
      </p>
      <p>
        <em>Other Sources</em>
        Images: Vecteezy
      </p>


      <p class="credit">
        This data visualization was made with data contributed by the United Nations World Food Programme.
        <br />
        Copyright © All rights reserved by the creators
        <br />
        <br />
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
      font-family: 'Space Mono', monospace;
      font-size: 18px;
      line-height: 1.7;
      position: relative;
    }

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
      max-width: 80%; /* adjust at will */
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
    }

    .farmerStory {
      height: 120vh;
      max-width: 100%; /* adjust at will */
      padding: 3em;
      margin: 2em 1em; 
      /* background-color: rgba(255, 255, 255, 0.65);  */
    }

    .container {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Space Mono', monospace;
    }

    .farmerimage {
      max-width: 70%;
      max-height: 70%;
    }
    .farmertext-title {
      font-size: 28px;
      padding-left: 20px;
      font-style: italic;
      font-family: 'Space Mono', monospace;
    }
    .farmertext-body {
      font-size: 18px;
      font-style: italic;
      font-family: 'Space Mono', monospace;
      background-color: rgba(255, 255, 255, 0.8); 
      padding: 6em;
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
    .source {
      font-size: 14px;
    }
    p {
      text-align: center;
    }

    button {
      background-color: rgba(255, 255, 255, 0);
      border-style: none;
      cursor: pointer;
      font-family: 'Space Mono', monospace;
      font-size: 16px;
      text-decoration: underline;
      text-align: center;
    }
    .nextPageButtonText {
      padding:10px 30px;
      background:rgba(255, 255, 255, 0);
      color:#000000;
      border:none;
      text-decoration: underline;
      cursor:pointer;
      margin: 30px auto 10px;
      display:block;
      font-family: 'Space Mono', monospace;
      font-size: 16px;
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