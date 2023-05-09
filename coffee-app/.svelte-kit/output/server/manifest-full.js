export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png","images/coffee.png","images/coffeebean-hands.jpeg","images/coffeebean.png","images/coffeebean2.png","images/coffeebeans.jpeg","images/coffeebeans2.jpeg","images/coffeecups.jpeg","images/coffeegame.png","images/coffeegame_result.png","images/coffeeplant.jpg","images/farmer.png","images/smallbean-hor.png","images/smallbean.png"]),
	mimeTypes: {".png":"image/png",".jpeg":"image/jpeg",".jpg":"image/jpeg"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.c4cc47e5.js","imports":["_app/immutable/entry/start.c4cc47e5.js","_app/immutable/chunks/index.40a3a753.js","_app/immutable/chunks/singletons.07ba1d31.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.f56c3e17.js","imports":["_app/immutable/entry/app.f56c3e17.js","_app/immutable/chunks/index.40a3a753.js"],"stylesheets":[],"fonts":[]}},
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
