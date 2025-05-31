import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	site: 'https://tigoni.github.io',  // Remove /chainstate from here
	integrations: [mdx(), sitemap()],
});
