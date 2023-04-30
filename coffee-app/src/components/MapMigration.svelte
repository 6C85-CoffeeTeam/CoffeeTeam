<script>

    export let index;

    let container;

  let isVisible = false;
  
  $: if (index === 9) {
    isVisible = true;
  } else {
    isVisible = false;
  }
  
  </script>
  

<iframe 
    width="800" 
    height="600" 
    title = "flow" 
    class = "flowmap"
    src="https://flowmap.blue/1ODcincYj0MjnBWdE6v2FFHltR2JCNV6buBM3aQlLhc0/embed?v=20.173050%2C-94.563081%2C4.77%2C0%2C0&a=1&as=1&b=1&bo=88&c=0&ca=0&cz=4&d=0&fe=1&lt=0&lfm=ALL&t=19900101T000000%2C20210101T000000&col=BuGn&f=19" 
    frameborder="0" 
    allowfullscreen
    ></iframe>

  <div class="flowmap" class:visible={isVisible} bind:this={container} />

  <style>
    .flowmap {
      width: 100%;
      height: 100vh; /* check problem when setting width */
      position: absolute;
      opacity: 0;
      visibility: hidden;
      transition: opacity 2s, visibility 2s;
      outline: blue solid 0px;
    }
  
    .flowmap.visible {
      opacity: 1;
      visibility: visible;
    }
  </style>
  
  