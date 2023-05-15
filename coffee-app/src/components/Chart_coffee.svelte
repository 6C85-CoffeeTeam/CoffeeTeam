<script>
    // imports
    import * as d3 from "d3";
    import {scaleLinear} from "d3-scale";
    import { CoffeeProduction } from "../data/coffeeproduction";
    import { scaleOrdinal } from 'd3';

    export let index;

    $: colorScale = scaleOrdinal()
    .domain(Array.from(new Set(data.map(d => d.country)))) // set domain to all unique country values
    .range(d3.schemeCategory10); // an array of 10 categorical colors provided by d3


    // exports
    export let data = [];
    CoffeeProduction.forEach((element) =>
        data.push({
            index: element["Year"],
            size: element["Production"],
            country: element["Country"],
        })
    );

    // Group data by country
    const groupedData = new Map();
    data.forEach(d => {
        if (!groupedData.has(d.country)) groupedData.set(d.country, []);
        groupedData.get(d.country).push(d);
    });

    $: lines = Array.from(groupedData.values());

    let line = d3.line()
    .x((d) => xScale(d.index))
    .y((d) => yScale(d.size));

    // set general use variables
    let chartWidth = 750;
    let chartHeight = 450;
    let legendWidth = 180;
    let legendHeight = 60;

    const paddings = {
        top: 50,
        left: 100,
        right: 50,
        bottom: 50,
    };
    
    $: xScale = scaleLinear()
        .domain([
            Math.min(...data.map((d) => d.index)),
            Math.max(...data.map((d) => d.index)),
        ])
        .range([paddings.left, chartWidth - paddings.right]);
    $: yScale = scaleLinear()
        .domain([
            0, //start from 0
            Math.max(...data.map((d) => d.size)),
        ])
        .range([chartHeight - paddings.bottom, paddings.top]);
    
        // define tick marks
    let xTicks = [];
    let yTicks = [];
    // let numTicks = 5;
    $: {
        xTicks = [];
        yTicks = [];

        if (data.length > 1) {
            let index_extent = [
                Math.round(Math.min(...data.map((d) => d.index))),
                Math.round(Math.max(...data.map((d) => d.index)) + 1),
            ];
            let index_increment = 5;
            for (
                let i = index_extent[0];
                i < index_extent[1];
                i = i + Math.max(1, index_increment)
            ) {
                xTicks.push(i);
            }

            let size_extent = [
                0, //start from 0
                Math.round(Math.max(...data.map((d) => d.size)) + 1),
            ];
            let size_increment = 1000;
            for (
                let i = size_extent[0];
                i < size_extent[1];
                i = i + Math.max(1, size_increment)
            ) {
                yTicks.push(i);
            }
        }
    }

    // hover effect
    const idContainer = "svg-container-" + Math.random() * 1000000;
    let mousePosition = { x: null, y: null };
    let pageMousePosition = { x: null, y: null };
    let currentHoveredPoint = null;

    function followMouse(event) {
        const svg = document.getElementById(idContainer);
        if (svg === null) return;
        const dim = svg.getBoundingClientRect();
        pageMousePosition = {
            x: event.pageX,
            y: event.pageY,
        };
        const positionInSVG = {
            x: event.clientX - dim.left,
            y: event.clientY - dim.top,
        };
        mousePosition =
            positionInSVG.x > paddings.left &&
            positionInSVG.x < chartWidth - paddings.right &&
            positionInSVG.y > paddings.top &&
            positionInSVG.y < chartHeight - paddings.bottom
                ? { x: positionInSVG.x, y: positionInSVG.y }
                : { x: null, y: null };
    }
    function removePointer() {
        mousePosition = { x: null, y: null };
    }
    function computeSelectedXValue(value) {
        currentHoveredPoint =
            data[
                data.indexOf(data.filter((d) => xScale(d.index) >= value)[0]) -
                    1
            ];
        return data.filter((d) => xScale(d.index) >= value)[0].index - 1;
    }
    function getDifference(lineData, currentIndex) {
        let currentData = lineData.find(d => d.index === currentIndex);
        let prevData = lineData.find(d => d.index === currentIndex - 1);
        
        if (!currentData || !prevData) return '';

        let diff = currentData.size - prevData.size;
        if (diff > 0) {
            return `<span style="color: green; font-size: 14px";>↑ ${diff}</span>`;
        } else if (diff < 0) {
            return `<span style="color: red; font-size: 14px">↓ ${-diff}</span>`;
        } else {
            return '';
        }
    }
    let isVisible = false;
  
    $: if (index === 12) {
        isVisible = true;
    } else {
        isVisible = false;
    }
    
    // let observer = new IntersectionObserver((entries, observer) => { 
    //     entries.forEach(entry => {
    //         // If the element is in the viewport
    //         if(entry.isIntersecting){
    //             entry.target.classList.add('visible'); // Add the 'visible' class to the element
    //         }
    //     });
    // });

    // // Get all the '.visualization' elements
    // let elements = document.querySelectorAll('.visualization');

    // // Observe each '.visualization' element
    // elements.forEach(element => {
    //     observer.observe(element);
    // });
    
</script>

<div class="visualization" class:visible={isVisible}>
<!-- <div class="visualization"> -->
    {#if data.length > 1}
    <svg
        width={chartWidth}
        height={chartHeight}
        on:mousemove={followMouse}
        on:mouseleave={removePointer}
        id={idContainer}
    >
        <g>
            <line
                x1={paddings.left}
                x2={chartWidth - paddings.right}
                y1={chartHeight - paddings.bottom}
                y2={chartHeight - paddings.bottom}
                stroke="#6e3003"
                stroke-width="2"
                class="axis"
            />
            <line
                x1={paddings.left}
                x2={paddings.left}
                y1={paddings.top}
                y2={chartHeight - paddings.bottom}
                stroke="#6e3003"
                stroke-width="2"
                class="axis"
            />
        </g>
        <g>
            <!-- {#each lines as lineData, i (lineData[0].country)}
                <path
                    d={line(lineData.map(d => [xScale(d.index), yScale(d.size)]))}
                    stroke={colorScale(lineData[0].country)}
                    stroke-width="3"
                    fill="none"
                />
            {/each} -->
            {#each lines as lineData, i (lineData[0].country)}
            <path
                d={line(lineData)}
                stroke={colorScale(lineData[0].country)}
                stroke-width="3"
                fill="none"
            />
            {/each}
        </g>
        
        <g transform="translate(0, {chartHeight - paddings.bottom})">
            {#each xTicks as x}
                <g
                    class="tick"
                    opacity="1"
                    transform='translate({xScale(x)},0)'
                >
                    <line stroke="#6e3003" y2="6" />
                    <text 
                        dy="0.71em" 
                        fill="#6e3003" 
                        y="10" 
                        x="-5"
                        text-anchor="middle"
                    >
                        {x}
                    </text>
                </g>
            {/each}
        </g>
        <g transform="translate({paddings.left}, 0)">
            {#each yTicks as y}
                <g
                    class="tick"
                    opacity="1"
                    transform="translate(0,{yScale(y)})"
                >
                    <line stroke="#6e3003" x2="-5" />
                    <text 
                        dy="0.32em" 
                        fill="#6e3003" 
                        x="-{10}"
                        text-anchor="end"
                    >
                        {y}
                    </text>
                </g>
            {/each}
        </g>
        <!-- Add X axis label -->
        <text 
            transform={`translate(${chartWidth / 2}, ${chartHeight - paddings.bottom + 50})`} 
            text-anchor="middle" 
            style="font-size: 14px; fill:#6e3003;"
        >
            Year
        </text>

        <!-- Add Y axis label -->
        <text 
            transform="rotate(-90)" 
            text-anchor="middle" 
            y={paddings.left - 75} 
            x={-chartHeight / 2}
            style="font-size: 14px; fill:#6e3003;"
        >
            Coffee Production (60kg bags)
        </text>
        {#if mousePosition.x !== null}
            <g transform="translate({xScale(computeSelectedXValue(mousePosition.x))} 0)">
                <line
                    x1="0"
                    x2="0"
                    y1={paddings.top}
                    y2={chartHeight - paddings.bottom - 2}
                    stroke="#6e3003"
                    stroke-width="1.2"
                />

                {#each lines as lineData, i (lineData[0].country)}
                    {#if lineData.find(d => d.index === computeSelectedXValue(mousePosition.x))}
                        <circle
                            cx={0}
                            cy={yScale(lineData.find(d => d.index === computeSelectedXValue(mousePosition.x)).size)}
                            r="3.5"
                            fill={colorScale(lineData[0].country)}
                        />
                    {/if}
                {/each}
            </g>
        {/if}
        <!-- <g class="legend" transform="translate({chartWidth - legendWidth}, {chartHeight - legendHeight})">
            {#each colorScale.domain() as country, i}
                <g transform="translate(0, {i * 20})">
                    <circle cx={5} cy={8} r="7" fill={colorScale(country)} />
                    <text x="24" y="9" dy=".35em">{country}</text>
                </g>
            {/each}
        </g> -->
    </svg>
    <div class="legend">
        {#each colorScale.domain() as country, i}
            <div class="legend-item" style="top: {i * 17}px">
                <svg width="30" height="30">
                    <circle cx="15" cy="15" r="7" fill={colorScale(country)} />
                </svg>
                <div class="legend-text">{country}</div>
            </div>
        {/each}
    </div>
    <!-- tooltip -->
    <!-- <div
    style="left: {pageMousePosition.x + 10}px; top: {pageMousePosition.y + 10}px"
    > -->
    <div class="tooltip">
        {#if mousePosition.x !== null}
            The number of 60kg bags of coffee produced in {computeSelectedXValue(mousePosition.x)}:
            {#each lines as lineData, i (lineData[0].country)}
                {#if lineData.find(d => d.index === computeSelectedXValue(mousePosition.x))}
                    <br>{lineData[0].country}: {lineData.find(d => d.index === computeSelectedXValue(mousePosition.x)).size}
                    {@html getDifference(lineData, computeSelectedXValue(mousePosition.x))}
                {/if}
            {/each}
        {/if}
    </div>
    <!-- <div
        style="left: {pageMousePosition.x + 10}px; top: {pageMousePosition.y +
            10}px"
    >
        {#if mousePosition.x !== null}
            In {computeSelectedXValue(mousePosition.x)},
            {#each lines as lineData, i (lineData[0].country)}
                {#if lineData.find(d => d.index === computeSelectedXValue(mousePosition.x))}
                    <br>{lineData[0].country} produced {lineData.find(d => d.index === computeSelectedXValue(mousePosition.x)).size} 60kg bags of coffee.
                {/if}
            {/each}
        {/if}
    </div> -->

    {/if}
</div>

<style>
    .visualization {
        margin: 60px 160px;
        margin-top: 1px;
        text-align: middle;
        visibility: visible;
        /* opacity: 0; */
        /* transition: opacity 2s, visibility 2s; */ 
    }
    .visualization.visible {
        visibility: visible;
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
    /* dynamic classes for the tooltip */
    /* .tooltip-hidden {
        visibility: hidden;
        font-family: "Nunito", sans-serif;
        width: 200px;
        position: absolute;
    }

    .tooltip-visible {
        font: 25px sans-serif;
        font-family: "Nunito", sans-serif;
        visibility: visible;
        background-color: #f0dba8;
        border-radius: 10px;
        width: 200px;
        color: black;
        position: absolute;
        padding: 10px;
        margin-top: 10px;
    } */

    .tooltip {
        margin-top: 15px;
    }

    .legend {
        position: absolute;
        right: -140px;
        top: 100px;
        padding: 0px;
    }

    .legend-item {
        position: relative;
        height: 20px;
        width: 300px;
    }

    .legend-text {
        position: absolute;
        left: 165px;
        top: 0;
        text-align: left;
    }
    .axis {
        stroke-linejoin: round;
        stroke-dasharray: 4400;
        stroke-dashoffset: 0;
        /* animation: draw 8.5s ease; */
    }
    /* @keyframes draw {
        from {
            stroke-dashoffset: 4400;
        }
        to {
            stroke-dashoffset: 0;
        }
    } */

</style>

