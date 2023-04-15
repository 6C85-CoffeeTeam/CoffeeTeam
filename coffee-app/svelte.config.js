// import adapter from '@sveltejs/adapter-auto';
import adapter from "@sveltejs/adapter-static";

{/* <script>
  import { base } from "$app/paths";
</script>

<a href="{base}/about">About</a> */}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === "production" ? "/sveltekit-gh-pages" : "",
			},
	}
};

export default config;
