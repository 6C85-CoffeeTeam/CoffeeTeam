<script>
    export let index;

    let isVisible = false;
  
  $: if (index === 0) {
    isVisible = true;
  } else {
    isVisible = false;
  }

</script>




<div class="image" class:visible={isVisible}>
    <img src="/src/images/coffee.png" alt="coffee" />
</div>



<style>
    .image {
      width: 100%;
      height: 100vh; /* check problem when setting width */
      position: absolute;
      opacity: 0;
      visibility: hidden;
      transition: opacity 2s, visibility 2s;
    }
  
    .image.visible {
      opacity: 1;
      visibility: visible;
    }

    img {
      margin: 10em;
      width: 500px;
    }
</style>