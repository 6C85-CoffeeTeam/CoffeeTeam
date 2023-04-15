import { c as create_ssr_component, d as each, e as escape, f as null_to_empty, h as add_attribute, v as validate_component } from "../../chunks/index.js";
import * as d3 from "d3";
const GlobalMap_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: 'path.svelte-1ot94te{stroke:black}.bar.svelte-1ot94te{height:60%;width:40px;position:absolute}.tooltip-hidden.svelte-1ot94te{visibility:hidden;font-family:"Nunito", sans-serif;width:200px;position:absolute}.tooltip-visible.svelte-1ot94te{font:15px sans-serif;font-family:"Nunito", sans-serif;visibility:visible;background-color:#f0dba8;border-radius:10px;width:200px;color:black;position:absolute;padding:10px}',
  map: null
};
const GlobalMap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { dataset = [] } = $$props;
  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  let recorded_mouse_position = { x: 0, y: 0 };
  let hovered = -1;
  const colorScale = d3.scaleLinear().domain([0, 58211]).range(["white", "brown"]);
  if ($$props.dataset === void 0 && $$bindings.dataset && dataset !== void 0)
    $$bindings.dataset(dataset);
  $$result.css.add(css$1);
  return `<div class="visualization"><svg width="1000" , height="600">${each(dataset, (data, index) => {
    return `<path${add_attribute("d", path(data), 0)}${add_attribute(
      "fill",
      index === hovered ? "green" : colorScale(data["properties"]["coffee"]),
      0
    )} class="svelte-1ot94te"></path>`;
  })}</svg>

  <div class="${escape(null_to_empty("tooltip-hidden"), true) + " svelte-1ot94te"}" style="${"left: " + escape(recorded_mouse_position.x, true) + "px; top: " + escape(recorded_mouse_position.y, true) + "px"}">&gt;
    ${``}</div>




  <div class="legend"><div class="bar svelte-1ot94te" style="${"background:linear-gradient(to bottom, " + escape(colorScale.range()[0], true) + ", " + escape(colorScale.range()[1], true) + "); right:50px; top:60px;"}"></div></div></div>


<main>
  
</main>`;
});
const App_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-12200kg{text-align:center;font-size:25px}",
  map: null
};
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dataset = [];
  d3.json("https://raw.githubusercontent.com/austinjstromme/CoffeeTeam/main/coffee-app/data/world.geojson").then((data) => {
    dataset = data.features;
  });
  $$result.css.add(css);
  return `<main><title>CoffeeApp
    </title>
    <h1 class="svelte-12200kg">The coffee belt: global coffee production is concentrated in the tropics
    </h1>
      ${validate_component(GlobalMap, "GlobalMap").$$render($$result, { dataset }, {}, {})}
  </main>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(App, "App").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
