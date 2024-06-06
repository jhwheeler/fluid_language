import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import relativeImages from 'mdsvex-relative-images';
import autolinkHeadings from 'rehype-autolink-headings';
import slugPlugin from 'rehype-slug';
import remarkExternalLinks from 'remark-external-links';
import preview, { htmlFormatter, textFormatter } from 'remark-preview';

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool',
  },
  remarkPlugins: [
    // Add a text preview snippet (no formatting) so we can use it in the meta description tag
    preview(textFormatter({ length: 250, maxBlocks: 2 })),

    // Add an HTML preview snippet (formatted) so we can use it when displaying all posts
    preview(
      htmlFormatter({
        length: 250,
        maxBlocks: 2,
      }),
      {
        attribute: 'previewHtml',
      },
    ),
    // external links open in a new tab
    [remarkExternalLinks, { target: '_blank', rel: 'noopener' }],
    relativeImages,
  ],
  rehypePlugins: [
    slugPlugin,
    [
      autolinkHeadings,
      {
        behavior: 'wrap',
      },
    ],
  ],
});

export default config;
