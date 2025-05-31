import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	base: '/chainstate', // Remove the trailing slash
	site: 'https://tigoni.github.io',  // Remove /chainstate from here
	integrations: [mdx(), sitemap()],
});
