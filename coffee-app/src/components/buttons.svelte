<script>
    import EChart from './E_App.svelte';
    import HChart from './H_App.svelte';
    import GChart from './G_App.svelte';
    let selectedChart = 'E';

    function showChart(chartName) {
      selectedChart = chartName;
    }
  </script>
  
  <div>
    <button class="button" on:click={() => showChart('E')}>El Salvador</button>
    <button class="button" on:click={() => showChart('H')}>Honduras</button>
    <button class="button" on:click={() => showChart('G')}>Guatemala</button>
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

    .button:hover {
      background-color:#000000;
		color: #FFFFFF;
      transition: 0.2s;
  }
	


  </style>

