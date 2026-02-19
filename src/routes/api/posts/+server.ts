import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';
import { fetchSubstackPosts } from '$lib/substack';

async function getLocalPosts(): Promise<Post[]> {
  const posts: Post[] = [];

  const paths = import.meta.glob('/src/posts/*.md', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Post, 'slug'>;
      const post = { ...metadata, slug, source: 'local' as const } satisfies Post;
      post.published && posts.push(post);
    }
  }

  return posts;
}

export async function GET() {
  const [localPosts, substackPosts] = await Promise.all([
    getLocalPosts(),
    fetchSubstackPosts()
  ]);

  const allPosts = [...localPosts, ...substackPosts];
  allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return json(allPosts);
}
