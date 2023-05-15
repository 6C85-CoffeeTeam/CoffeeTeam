<script>
    import Scroller from "@sveltejs/svelte-scroller";
    import * as d3 from "d3";
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
    import ChartCoffee from "./Chart_coffee.svelte";
    import Quote from "./Quote.svelte";
    import Button from "./buttons.svelte"

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
    const additionalYOffset = 300;
    const nextPagePosition = window.innerHeight + window.pageYOffset + additionalYOffset;
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
  <!-- on:click={handleClick} -->

    <!-- <Background {index} /> -->

    <!-- <Map bind:geoJsonToFit {index}/> -->

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
        <h1>Hi there, how's your coffee? </h1>
        <p>
          Have you ever wondered where your coffee comes from?
          <br />
          Let's take a step back.
        </p>

        <button on:click={scrollToNextPage}>
          <img
            class="latte"
            src="./images/latte.png"
            alt="coffee"
            width="500"
          />
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

    <section class="worldmap">
      <div class="textbox">
        <p>
          Here's a map of the world, and the countries that produce coffee.
        </p>
        <p>
          Hover over each country to see how much coffee they produced in 2020.
          Do you notice a pattern?
        </p>
        
        <button class="nextPageButtonText" on:click={scrollToNextPage} style:font-size="14px">
          Jump to next section
        </button>
      </div>
      <div class="map">
        <Map bind:geoJsonToFit {index}/>
      </div>

    </section>
    <section class="worldmap">
      <div class="textbox">
        Coffee trees grow best in a region called <span class="emphasize"
          >"The Bean Belt"</span
        >
        which is located near the Equator, between latitudes 23.5 degrees North
        and 23.5 degrees South.
        <br />
        <br />
        <br />
        The coffee belt passes through some
        <span class="emphasize">70 countries</span>, which have tropical
        climates that provide rich environments that are perfect for growing
        coffee.
      </div>
    </section>

    <section class="coffeeQuiz">
      <div>
        <Quiz />
      </div>
      <button class="nextPageButtonText" on:click={scrollToNextPage} transition:fade>
        Jump to next section
      </button>
    </section>

    <section class="quote">
      <div class="textbox"> 
        <p>
          Warming climate may affect coffee in many ways, including reduced
          growing area, increased pests, and loss of quality.
        </p>
        <p>
          While these changes would be inconvenient for coffee drinkers, they
          could be catastrophic for coffee growers.
        </p>
        <img class="smallbean" src="./images/smallbean-hor.png" alt="coffeebean" width="50" />
        <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
        <img class="smallbean" src="./images/smallbean-hor.png" alt="coffeebean" width="50"/>
        <img class="smallbean" src="./images/smallbean.png" alt="coffeebean" width="30"/>
      </div>
    </section>

    <section class="chapterTwo">
      <div class="textbox">
        <p>
          Let's zoom into a region named the <span class="emphasize">Northern Triangle</span>, which includes Guatemala, Honduras, and El Salvador.
        </p>
        <p>
          <span class="emphasize">1.3 million</span> people in this region grow
          coffee for a living, and their livelihoods are increasingly impacted
          by climate change.
          <a
            class="source"
            href="https://www.ipcc.ch/site/assets/uploads/2018/02/WGIIAR5-Chap27_FINAL.pdf"
            target="_blank"
            rel="noopener noreferrer">[1]</a
          >,
          <a
            class="source"
            href="https://crsreports.congress.gov/product/pdf/IF/IF11151/7"
            target="_blank"
            rel="noopener noreferrer">[2]</a
          >.
        </p>
      </div>
    </section>
    <section>
      <div class="textbox" transition:fade={{ duration: 5000 }}>
        <p>
          Rising temperatures and heavy rain driven by climate change has caused
          a severe coffee rust outbreak in Central America since 2012.
        </p>
        <p>
          Unlike the outbreaks in the 1970s and 1980s, which were limited to
          warm, low altitudes, the new wave of coffee rust spread quickly to
          high altitudes.
        </p>

        <p>
          This affected over <span class="emphasize">55%</span> of the region's
          coffee farms and left around <span class="emphasize">350,000</span> people
          jobless <a
          class="source"
          href="https://www.climate.gov/news-features/climate-and/climate-coffee"
          target="_blank"
          rel="noopener noreferrer">[3]</a
        >.
        </p>
      </div>
    </section>

    <section class="farmerStory">
      <div class="container">

        <div class="farmertext-title">
          Meet Juan, <br />a smallholder coffee farmer in Honduras.
        </div>
        <div>
          <img class="farmerimage" src="./images/farmer.png" alt="farmer" />
        </div>
      </div>
    </section>

    <section class="farmerStory">
      <div class="farmertext-body">
        <p>
          "My family has been growing coffee for generations and I have been
          working on our farm ever since I was a kid. I am deeply connected to
          the land and the coffee we produce...
        </p>
        <p>
          However, we have been struggling. Over the past few years, I have
          noticed significant changes in the climate that are affecting the
          coffee production and our daily lives."
        </p>
        <img
          class="farmerimage"
          src="./images/farmer2.png"
          alt="farmer"
          width="300"
        />
      </div>
    </section>

    <section class="chapterThree">
      <div class="textbox">
        <h1>Climate change in the Northern Triangle</h1>
        <p>
          <em>
            "We have seen temperatures rise above 25 degrees during the day, which
          has caused the coffee plants to grow slowly, decreasing yield and
          quality."
          </em>
        </p>
        <!-- <img
          class="farmerimage"
          src="./images/farmer.png"
          alt="farmer"
          width="300"
        /> -->
      </div>
    </section>
    <section class="chapterThree">
      <div class="textbox">
        <h1>Natural disasters in the Northern Triangle</h1>
        <p>
          <em>"We experienced extreme droughts in 2014 and 2018. Also, the hurricane in 2020 wiped out most of our coffee plants."</em>
        </p>
      </div>
    </section>
    <section class="farmerStory">
      <div class="textbox">
        <h1>
          How does all of this link to coffee production?
        </h1>
        <p style:font-size="16px">Between 2012-2015 (shaded in gray), the coffee rust affected over 55% of <br />the region's
          coffee farms and left around 350,000 people
          jobless.</p>
        <p style:font-size="14px">Hover over the graph to learn more</p>
      <div class="graph">
        <ChartCoffee {index}/>
        
      </div>
        
      </div>
    </section>

    <section class="quote">
      <div class="textbox">
        <Quote {index} />
      </div>
    </section>

    <section class="flowmap">
      <!-- <h1>Migration from the Northern Triangle</h1> -->
      <div class="textbox">
        <h1>
          Migration from the Northern Triangle to the US vs the World
        </h1>
        <p style:font-size="14px">Hover over the graph to learn more</p>
        <div class="graph">
          <Button {index}/>
        </div>
        <br />
        <br />
        <p>
          Juan is just one of millions of smallholder coffee farmers that have been affected by climate change, which is causing significant disruptions to agriculture and natural ecosystems. 
        </p>
        <p>When people can no longer sustain their livelihoods, they are often forced to make the difficult decision to migrate in search of a more stable and secure future, often risking their lives.</p>
        <br />
        <br />
        <br />
        <br />
        
      <!-- <iframe 
        width="100%" 
        height="600"
        title="flowmap"
        src="https://flowmap.blue/1ODcincYj0MjnBWdE6v2FFHltR2JCNV6buBM3aQlLhc0?v=23.301426%2C-92.632810%2C4.43%2C0%2C0&a=1&as=1&b=1&bo=84&c=0&ca=0&cz=4&d=0&fe=1&lt=0&lfm=ALL&t=19900101T000000%2C19960101T000000&col=BuGn&f=19"
        frameborder="0"
        allowfullscreen
        ></iframe>
        <br /> -->

    </section>
    <section class="ending">

      <h1>Want to learn more?</h1>
      <p>Click the bean to find out.</p>
      <a href="https://coffeeandclimate.org/"          
        target="_blank"
        rel="noopener noreferrer" >
        <button>
          <img
            class="bean"
            src="./images/coffeebean.png"
            alt="coffeebean"
            width="500"
          />
        </button>
      </a>

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
      <em>Other</em>
      <p>
        Image source: Vecteezy
      </p>
      <!-- <p>
      <a
        class="source"
        href="https://www.ipcc.ch/site/assets/uploads/2018/02/WGIIAR5-Chap27_FINAL.pdf"
        target="_blank"
        rel="noopener noreferrer">[1]</a
      >,
      <a
        class="source"
        href="https://crsreports.congress.gov/product/pdf/IF/IF11151/7"
        target="_blank"
        rel="noopener noreferrer">[2]</a
      >,
      <a
          class="source"
          href="https://www.climate.gov/news-features/climate-and/climate-coffee"
          target="_blank"
          rel="noopener noreferrer">[3]</a
        >
        
      </p> -->

      <p class="credit">
        This data visualization was made with data contributed by the United
        Nations World Food Programme.
        <br />
        <br />
        Copyright © All rights reserved by the creators (Eunhae Lee, Austin Stromme, Nishtha Sardana, Muqing Bai)
        <a
          class="credit"
          href="https://github.com/6C85-CoffeeTeam/CoffeeTeam"
          target="_blank"
          rel="noopener noreferrer">Github Source</a
        >
        <br />
        <br />
      </p>
    </section>
  </div>
</Scroller>


<style>
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Space+Mono&display=swap');

  .background {
    width: 100%; /* to get rid of the weird margin */
    height: 100vh;
    position: relative;
    top: 0px; 
    left: 0px; /* to get rid of the weird margin */
    /* pointer-events: fill; */
    /* pointer-events: all;
    z-index: 2; */
  }

  .foreground {
    width: 100%;
    /* z-index: 1; */
    margin: 0 auto;
    height: auto;
    position: relative;
    /* pointer-events: none; */
  }
    
  [slot="background"] {
    pointer-events: all;
  }

  [slot="foreground"] {
    pointer-events: auto;
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
    margin: 1em 0 2em 45em;
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
      top: 40%; /* vertically center */
      -ms-transform: translateY(-50%); /* vertically center */
      transform: translateY(-50%); /* vertically center */
      margin: 3em auto;
    }

    .worldmap {
      height: 150vh;
      max-width: 100%; 
      padding: 0em;
      margin: 0 auto;
    }

    .worldmap .map {
      z-index: 0;
      margin-left: 0;
    }
    .worldmap .textbox {
      top: 30em;
      margin: 0 auto;
      width: 450px;
      background-color: rgba(255, 255, 255, 0.8); 
      z-index: 1;
    }

    .quote {
      height: 100vh;
      max-width: 80%; /* adjust at will */
      padding: 3em;
      margin: 0 auto;
      font-family:'EB Garamond', serif;
      font-size: 28px;
    }

    .quote .textbox {
      background-color: rgba(207, 207, 207, 0.5); 
      padding: 3em;
      /* position: relative; */
      top: 30%; /* vertically center */
      text-align: center;
    }
    .coffeeQuiz {
      max-width: 70%; /* adjust at will */
      padding: 10em 0 0 0;
      /* margin-left: 10px;
      margin-right: 10px; */
      margin: 0 auto;
      position: relative;
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

  .farmerStory {
      height: 120vh;
      max-width: 90%; /* adjust at will */
      padding: 3em;
      margin: 2em; 
      /* background-color: rgba(255, 255, 255, 0.65);  */
    }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Mono', monospace;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 3em 0;
  }
    .farmerimage {
      max-width: 65%;
      max-height: 65%;
    }
    .farmertext-title {
      font-size: 34px;
      margin: 0 2em;
      padding: 1em;
      font-style: italic;
      font-family: 'EB Garamond', serif;
      /* font-weight: bolder; */

    }
    .farmertext-body {
      font-size: 18px;
      font-style: italic;
      font-family: 'Space Mono', monospace;
      background-color: rgba(255, 255, 255, 0.8); 
      padding: 4em;
      margin: 0 auto;
    }

    .graph {
      margin: 0 auto;
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
  
  p {
    text-align: center;
  }

  .emphasize {
    font-size: 23px;
    color: #c0491d;
    font-weight:800;
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
    z-index: 2;
  }
  h1 {
    margin: 8px 0 20px 0;
  }
  .flowmap,
  .ending {
      max-width: 80%; /* adjust at will */
      padding: 0;
      margin: 0 auto;
    }
  .source {
    font-size: 14px;
  }

  .bean {
    margin: 2em 0 2em 0;
  }

  .bean:hover {
    filter: drop-shadow(8px 8px 8px #848484);
    text-align: center;
    margin: 2em 0 2em 10px;
  }

  .credit {
    font-size: 12px;
    color: gray;
    margin: 13em 0 0 0;
  }
</style>
