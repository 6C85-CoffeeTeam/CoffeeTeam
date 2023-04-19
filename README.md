# Instructions for working on our webapp #

1. Make sure you have node installed on your computer (on mac try 'brew install node')
2. Navigate to coffee-app/ and do 'npm install' and 'npm install d3'
3. Start up the server with 'npm run dev --open'
4. Navigate to http://localhost:5173/ to view the app
5. Make edits in coffee-app/src/components/ files


## Source of world geoJSON files ##

https://github.com/johan/world.geo.json


## Tasks ##

2. First visualization:
	- Fix the color scheme from continuous to discrete by modifying the colorScale object in coffee-app/src/components/GlobalMap.svelte
	- Get a decent legend going, with tick marks, either by finding your own solution, or modifying the Legend.svelte file and uncommenting the call to it in GlobalMap.svelte (in the <main> block)
3. Second visualization:
	- get a rough draft running and appearing with some scrolling under the first one
	- get a clear understanding of what data we'll need and where it needs to be (could be based off a version of our world.geojson file where we only keep the countries that we're interested in and we then add in climate-related data in the properties field; we'll probably want to automate this with a script or something)
	- Try add a toggle that will allow the user to select years or data types or whatever else we were imagining
	- Get some kind of a text box with an image appearing for our narrator
4. Once 3 is done, someone can be in charge of gathering, cleaning, and entering the data that we'll need for the second visualization
5. Rinse and repeat steps 3-4 for remaining two visualizations
6. (This is pretty independent of the other steps I think) find a way to put coffee beans and other coffee aesthetic into the visualization, should be a matter of putting in <svg>s somewhere with images that you choose, but I'm not 100% sure

## Notes on deploying to our github page ##

If you want to get your changes to the app to reflect on the website, then run "npm run build" followed by "npm run deploy"

If you want to view the app as you're working on it, do "npm run dev -- --open"

I ended up finding that these instructions worked for us: https://javascript.plainenglish.io/sveltekit-github-pages-4fe2844773de .

