<script>
    export let index;

    let isVisible = false;
  
    $: if (index === 10) {
        isVisible = true;
    } else {
        isVisible = false;
    }
    
</script>


<div class="container" class:visible={isVisible}>
    <div>
        <img class="farmerimage" src="./images/farmer.png" alt="farmer" />
      </div>
      <div class="farmertext-title">
        Meet Juan, <br />a smallholder coffee farmer in Honduras.
      </div>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Space Mono', monospace;

    }
    .container.visible {
        /* visibility: visible; */
        animation: floatIn 2s forwards; 
    }

    @keyframes floatIn {
    0% {
        transform: translateY(100px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
.farmertext-title {
      font-size: 28px;
      padding-left: 20px;
      font-style: italic;
      font-family: 'Space Mono', monospace;
    }
</style>