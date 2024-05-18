import remarkGithub from 'remark-github'
import remarkAbbr from 'remark-abbr'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export default {
  extensions: ['.svelte.md', '.md', '.svx', '.svelte'],
  remarkPlugins: [
    [
      remarkGithub,
      {
        repository: 'https://github.com/jhwheeler/fluid_language',
      },
    ],
    remarkAbbr,
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
      },
    ],
  ],
}
