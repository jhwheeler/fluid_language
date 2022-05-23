import adapter from '@sveltejs/adapter-auto';
import md from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    preprocess({
      postcss: true,
    }),
    md.mdsvex(mdsvexConfig),
  ],
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: adapter(),
    prerender: {
    onError: 'continue'
    }
  }
};

export default config;
