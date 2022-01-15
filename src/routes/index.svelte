<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    // Use a `limit` querystring parameter to fetch a limited number of posts
    // e.g. fetch('posts.json?limit=5') for 5 most recent posts
    const posts = await fetch('/posts.json').then((res) => res.json());

    return {
      props: {
        posts
      }
    };
  }
</script>

<script>
  import { page } from '$app/stores'
  import PageHead from '$lib/components/PageHead.svelte';
  import Article from '$lib/components/Article.svelte';
  import ArticleTitle from '$lib/components/ArticleTitle.svelte';
  import ArticleMeta from '$lib/components/ArticleMeta.svelte';
  import ArticleDescription from '$lib/components/ArticleDescription.svelte';

  export let posts;

  $: tag = $page.url.searchParams.get('tag')
  $: filteredPosts = tag ? posts.filter(p => p.tags.includes(tag)) : posts

</script>

<PageHead description="Polyglot blog about philosophy, linguistics, and spirituality." />

<p>Hi, my name is <a href="https://www.instagram.com/jacksonholidaywheeler/" target="_blank">Jackson</a>. Welcome to my blog about philosophy, linguistics, and spirituality.</p>

{#each filteredPosts as { slug, title, description, tags, date }}
  <Article>
    <ArticleTitle {slug} {title} />
    <ArticleDescription {description} {slug} />
    <ArticleMeta {tags} {date} />
  </Article>
{/each}

<slot />

<style>
  a {
    font-weight: 500;
  }
</style>
