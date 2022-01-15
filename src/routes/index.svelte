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
  import PageHead from '$lib/components/PageHead.svelte';
  import Article from '$lib/components/Article.svelte';
  import ArticleTitle from '$lib/components/ArticleTitle.svelte';
  import ArticleMeta from '$lib/components/ArticleMeta.svelte';
  import ArticleDescription from '$lib/components/ArticleDescription.svelte';

  export let posts;

</script>

<PageHead description="Polyglot blog about philosophy, linguistics, and spirituality." />

{#each posts as { slug, title, description, tags, date }}
  <Article>
    <ArticleTitle {slug} {title} />
    <ArticleDescription {description} {slug} />
    <ArticleMeta {tags} {date} />
  </Article>
{/each}

<slot />
