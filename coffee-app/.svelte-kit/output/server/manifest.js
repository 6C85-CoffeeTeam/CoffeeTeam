export const manifest = {
	appDir: "_app",
	appPath: "sveltekit-gh-pages/_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.33021aaf.js","imports":["_app/immutable/entry/start.33021aaf.js","_app/immutable/chunks/index.d4447b65.js","_app/immutable/chunks/singletons.619bb145.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.8b3fd013.js","imports":["_app/immutable/entry/app.8b3fd013.js","_app/immutable/chunks/index.d4447b65.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
