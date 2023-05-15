<script>
    import EChart from './E_App.svelte';
    import HChart from './H_App.svelte';
    import GChart from './G_App.svelte';
    let selectedChart = 'E';
    let isDisabled = false;

    function showChart(chartName) {
      selectedChart = chartName;
    }
    function handleClick(country) {
    // change the background color of the button to black
      
      // document.getElementById('E').style.backgroundColor = "white"
      // document.getElementById('H').style.backgroundColor = "white"
      // document.getElementById('G').style.backgroundColor = "white"

      // document.getElementById('E').style.color = "black"
      // document.getElementById('H').style.color = "black"
      // document.getElementById('G').style.color = "black"

      // document.getElementById(country).style.backgroundColor = "black"
      // document.getElementById(country).style.color = "white"
      
      // show a chart for the clicked country
      selectedChart=country;
      showChart(country);
  }
  </script>
  
  <div>

    <button class={selectedChart=="E"?"selected-button":"button"} on:click={() => handleClick('E')}>El Salvador</button>
    <button class={selectedChart=="H"?"selected-button":"button"} on:click={() => handleClick('H')}>Honduras</button>
    <button class={selectedChart=="G"?"selected-button":"button"} on:click={() => handleClick('G')}>Guatemala</button>

    <!-- <button id="E" class="button" on:click={() => handleClick('E')}>El Salvador</button>
    <button id="H" class="button" on:click={() => handleClick('H')}>Honduras</button>
    <button id="G" class="button" on:click={() => handleClick('G')}>Guatemala</button> -->
  </div>
  
  {#if selectedChart === 'E'}
    <EChart />
  {/if}
  
  {#if selectedChart === 'H'}
    <HChart />
  {/if}
  
  {#if selectedChart === 'G'}
    <GChart />
  {/if}

  <style>
    .button {

      padding:10px 30px;
      background:#FFFFFF;
      color:#000000;
      border:solid;
      border-width: 3px;
      border-color:#000000;
/* 		outline:solid; */
      border-radius:0px;
      cursor:pointer;
      margin: 20px auto 0;
      /* display:block; */
      font-family: 'Space Mono', monospace;
      font-size: 16px;
    }

    .selected-button{

      padding:10px 30px;
      background:#000000;
      color:#FFFFFF;
      border:solid;
      border-width: 3px;
      border-color:#000000;
      /* 		outline:solid; */
      border-radius:0px;
      cursor:pointer;
      margin: 20px auto 0;
      /* display:block; */
      font-family: 'Space Mono', monospace;
      font-size: 16px;
      }

    .button:hover {
      background-color:#000000;
		  color: #FFFFFF;
      transition: 0.2s;
  }
	


  </style>

