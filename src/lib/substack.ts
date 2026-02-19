import { XMLParser } from 'fast-xml-parser';
import type { Post } from './types';

const SUBSTACK_FEED_URL = 'https://fluidlanguage.substack.com/feed';

interface SubstackItem {
  title: string;
  link: string;
  description: string;
  'content:encoded': string;
  pubDate: string;
  category?: string | string[];
  'dc:creator'?: string;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export async function fetchSubstackPosts(): Promise<Post[]> {
  try {
    const response = await fetch(SUBSTACK_FEED_URL);
    if (!response.ok) {
      console.warn(`Substack feed returned ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(xml);

    const items: SubstackItem[] = parsed?.rss?.channel?.item;
    if (!items || !Array.isArray(items)) return [];

    return items.map((item) => {
      const categories = Array.isArray(item.category)
        ? item.category
        : item.category
          ? [item.category]
          : [];

      return {
        slug: `substack-${slugify(item.title)}`,
        title: item.title,
        description: stripHtml(item.description || '').slice(0, 200),
        published: true,
        tags: categories,
        date: new Date(item.pubDate).toISOString().split('T')[0],
        languages: [],
        source: 'substack' as const,
        substackUrl: item.link,
        htmlContent: item['content:encoded']
      };
    });
  } catch (e) {
    console.warn('Failed to fetch Substack feed:', e);
    return [];
  }
}
