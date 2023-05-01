export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store",".nojekyll","favicon.png","images/coffee.png","images/coffeebean-hands.jpeg","images/coffeebean.png","images/coffeebean2.png","images/coffeebeans.jpeg","images/coffeebeans2.jpeg","images/coffeecups.jpeg","images/coffeegame.png","images/coffeegame_result.png","images/coffeeplant.avif","images/farmer.png","images/smallbean-hor.png","images/smallbean.png"]),
	mimeTypes: {".png":"image/png",".jpeg":"image/jpeg",".avif":"image/avif"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.f7be6194.js","imports":["_app/immutable/entry/start.f7be6194.js","_app/immutable/chunks/index.c3f27973.js","_app/immutable/chunks/singletons.40697b66.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.02fa2ed1.js","imports":["_app/immutable/entry/app.02fa2ed1.js","_app/immutable/chunks/index.c3f27973.js"],"stylesheets":[],"fonts":[]}},
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
