<script>
    export let index;

    let isVisible = false;
  
    $: if (index === 12) {
        isVisible = true;
    } else {
        isVisible = false;
    }
    
</script>


<div class="quote" class:visible={isVisible}>
    <p>
        "When coffee is not doing well, that's when you see big migrations from Honduras, El Salvador, Guatemala, Nicaragua."
    </p>
    <em>– René León-Gómez, Executive Secretary of PROMECAFE</em>
</div>

<style>
    .quote {
        margin: 2em auto;
        text-align: middle;

    }
    .quote.visible {
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
</style>