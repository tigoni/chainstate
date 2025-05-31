import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	base: '/chainstate',
	site: 'https://tigoni.github.io/chainstate',
	integrations: [mdx(), sitemap()],
});
