export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.b2051a75.js","imports":["_app/immutable/entry/start.b2051a75.js","_app/immutable/chunks/index.d4447b65.js","_app/immutable/chunks/singletons.f9d942f5.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.b1ae7599.js","imports":["_app/immutable/entry/app.b1ae7599.js","_app/immutable/chunks/index.d4447b65.js"],"stylesheets":[],"fonts":[]}},
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
