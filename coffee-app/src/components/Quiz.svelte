<script>
    import { fade } from "svelte/transition";
    let visible = true;
  </script>


<img transition:fade class="coffeegame" src="./images/coffeegame_result.png" alt="coffeegame" width="750"/>
<!-- <button on:click={() => visible = !visible}>Start Quiz</button>
{#if visible}
    <p transition:fade>foo</p>
{/if} -->

<style>
    button {
        
    }
</style>

