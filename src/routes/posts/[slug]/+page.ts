import { error } from "@sveltejs/kit";

export async function load({ params, fetch }) {
  // Check if this is a Substack post
  if (params.slug.startsWith('substack-')) {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    const post = posts.find((p: { slug: string }) => p.slug === params.slug);

    if (post) {
      return {
        metadata: {
          title: post.title,
          description: post.description,
          tags: post.tags,
          date: post.date,
          languages: post.languages,
          source: 'substack',
          substackUrl: post.substackUrl
        },
        htmlContent: post.htmlContent,
        content: null
      };
    }

    error(404, 'Post not found');
  }

  // Local markdown post
  try {
    const post = await import(`../../../posts/${params.slug}.md`)
    const { default: content, metadata } = post

    return {
      content,
      metadata: { ...metadata, source: 'local' },
      htmlContent: null
    }
  } catch (e) {
    error(404, e)
  }
}
