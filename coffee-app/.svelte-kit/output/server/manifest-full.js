export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store",".nojekyll","favicon.png","images/.DS_Store","images/coffee.png","images/coffeebean-hands.jpeg","images/coffeebean.png","images/coffeebean2.png","images/coffeebeans.jpeg","images/coffeebeans2.jpeg","images/coffeecups.jpeg","images/coffeegame.png","images/coffeegame_result.png","images/coffeeplant.jpg","images/farmer.png","images/smallbean-hor.png","images/smallbean.png"]),
	mimeTypes: {".png":"image/png",".jpeg":"image/jpeg",".jpg":"image/jpeg"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.19993d45.js","imports":["_app/immutable/entry/start.19993d45.js","_app/immutable/chunks/index.c3f27973.js","_app/immutable/chunks/singletons.3975ea35.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.c1faeaa1.js","imports":["_app/immutable/entry/app.c1faeaa1.js","_app/immutable/chunks/index.c3f27973.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
