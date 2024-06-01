import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import mdsvexConfig from './mdsvex.config.js'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true
    }),
    mdsvex(mdsvexConfig),
  ],
  kit: {
    adapter: adapter()
  },
};

export default config;
