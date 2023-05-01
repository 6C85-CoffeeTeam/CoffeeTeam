export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.f601b572.js","imports":["_app/immutable/entry/start.f601b572.js","_app/immutable/chunks/index.c3f27973.js","_app/immutable/chunks/singletons.79880463.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.5ad4f060.js","imports":["_app/immutable/entry/app.5ad4f060.js","_app/immutable/chunks/index.c3f27973.js"],"stylesheets":[],"fonts":[]}},
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
