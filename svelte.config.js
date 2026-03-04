import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import mdsvexConfig from './mdsvex.config.js';
import { mdsvex } from 'mdsvex';

const dev = process.argv.includes('dev') || process.argv.includes('preview');

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true,
    }),
    mdsvex(mdsvexConfig),
  ],
  kit: {
    adapter: adapter({
      fallback: '404.html',
    }),
    paths: {
      base: dev ? '' : '/fluid_language',
    },
  },
};

export default config;
