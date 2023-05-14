<script>
    // imports
    import * as d3 from "d3";
    import {scaleLinear} from "d3-scale";
    import { CoffeeProduction } from "../data/coffeeproduction";
    import { scaleOrdinal } from 'd3';
    // import { line } from 'd3';


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

</script>

<div class="visualization">
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

        {#if mousePosition.x !== null}
            <g transform="translate({xScale(computeSelectedXValue(mousePosition.x))} 0)">
                <line
                    x1="0"
                    x2="0"
                    y1={paddings.top}
                    y2={chartHeight - paddings.bottom - 2}
                    stroke="black"
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
            <div class="legend-item" style="top: {i * 20}px">
                <svg width="30" height="20">
                    <circle cx="10" cy="10" r="7" fill={colorScale(country)} />
                </svg>
                <div class="legend-text">{country}</div>
            </div>
        {/each}
    </div>
    <div
        style="left: {pageMousePosition.x + 10}px; top: {pageMousePosition.y +
            10}px"
    >
        {#if mousePosition.x !== null}
            In {computeSelectedXValue(mousePosition.x)}:
            {#each lines as lineData, i (lineData[0].country)}
                {#if lineData.find(d => d.index === computeSelectedXValue(mousePosition.x))}
                    <br>{lineData[0].country}: {lineData.find(d => d.index === computeSelectedXValue(mousePosition.x)).size}
                {/if}
            {/each}
        {/if}
        
        </div>
    {/if}

</div>

<style>
    .visualization {
        margin: auto;
        margin-top: 1px;
        text-align: middle;
    }

    /* dynamic classes for the tooltip */
    .tooltip-hidden {
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
    }

    .legend {
        position: absolute;
        right: 10px;
        top: 100px;
        padding: 10px;
    }

    .legend-item {
        position: relative;
        height: 20px;
    }

    .legend-text {
        position: absolute;
        left: 0px;
        top: 0;
    }
    .axis {
        stroke-linejoin: round;
        stroke-dasharray: 4400;
        stroke-dashoffset: 0;
        animation: draw 8.5s ease;
    }
    @keyframes draw {
        from {
            stroke-dashoffset: 4400;
        }
        to {
            stroke-dashoffset: 0;
        }
    }

</style>

