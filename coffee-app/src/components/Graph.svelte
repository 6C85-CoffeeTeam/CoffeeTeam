<script>
  import { fly, draw } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut, cubicInOut } from "svelte/easing";
  import { beanbelt } from "../data/beanbelt";

  export let index, width, height, projection;

  const tweenOptions = {
    delay: 0,
    duration: 1000,
    easing: cubicOut,
  }

  const tweenedX = tweened(
    beanbelt.features.map((line) => projection(line.geometry.coordinates)[0]),
    tweenOptions
  );

  const tweenedY = tweened(
    beanbelt.features.map((line) => projection(line.geometry.coordinates)[1]),
    tweenOptions
  );

  $: tweenedData = beanbelt.features.map((line, i) => ({
    x: $tweenedX[i],
    y: $tweenedY[i],
    properties: line.properties,
  }));

  $: {
    // if (index === 3) {
    //   tweenedX.set(beanbelt.features.map((city) => width / 2));
    //   tweenedY.set(beanbelt.features.map((city, i) => height / 2 + i * 20));
    // }

    if (index === 1) {
      tweenedX.set(
        beanbelt.features.map((line) => projection(line.geometry.coordinates)[0])
      );
      tweenedY.set(
        beanbelt.features.map((line) => projection(line.geometry.coordinates)[1])
      );
    }
  }

// Define your filter condition
const filter_equator = (feature) => {
    return (
      feature.properties.line === "equator"
    );
  };
const filter_belt = (feature) => {
    return (
      feature.properties.line === "belt"
    );
  };


  // Filter the features
  const equator = beanbelt.features.filter(filter_equator);
  const belt = beanbelt.features.filter(filter_belt);


  // Create the string of coordinates
  $: lineEquator = equator
    .map((feature) => {
      const transformedCoordinates = projection(feature.geometry.coordinates);
      return transformedCoordinates.join(",");
    })
    .join(" ");
 

  let strokeWidth = tweened(1, { duration: 5000, easing: cubicOut });

  // Reactive statement to update stroke-width when condition changes
  $: {
    if (index > 4) {
      strokeWidth.set(10); // Set stroke-width to 10 when condition is true
    }

    if (index <= 4) {
      strokeWidth.set(0); // Set stroke-width to 1 when condition is false
    }
  }

</script>

<svg class="graph">
  {#if index > 0}
    {#if index > 2}
      <polyline
        points={pointsStringA1}
        fill="none"
        stroke="#FFCCBC"
        stroke-width="3"
        transition:draw={{ duration: 5000, easing: cubicInOut }}
      />
      <polyline
        points={pointsStringA2}
        fill="none"
        stroke="#FFCCBC"
        stroke-width="3"
        transition:draw={{ duration: 5000, easing: cubicInOut }}
      />
      <polyline
        points={pointsStringA3}
        fill="none"
        stroke="#FFCCBC"
        stroke-width="3"
        transition:draw={{ duration: 5000, easing: cubicInOut }}
      />
    {/if}
    
    
    {#each tweenedData as city, i}
      {#if city.x && city.y}
        <text
          x={city.x}
          y={city.y}
          id={city.properties.name}
          in:fly={{ x: -300, duration: 200 * i }}
          out:fly={{ x: -300, duration: 200 * i }}
          >{city.properties.city}
        </text>
      {/if}
    {/each}
  {/if}
</svg>

<style>
    .graph {
      width: 100%;
      height: 100vh; /* check problem when setting width */
      position: absolute;
      outline: red solid 7px;
    }
  </style>