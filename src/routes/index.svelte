<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const posts = await fetch('/posts.json').then((res) => res.json())

    return {
      props: {
        posts,
      },
    }
  }
</script>

<script>
  import { page } from '$app/stores'
  import PageHead from '$lib/components/PageHead.svelte'
  import ArticleTitle from '$lib/components/ArticleTitle.svelte'
  import ArticleMeta from '$lib/components/ArticleMeta.svelte'
  import ArticleDescription from '$lib/components/ArticleDescription.svelte'

  export let posts

  $: tag = $page.url.searchParams.get('tag')
  $: filteredPosts = tag ? posts.filter((p) => p.tags.includes(tag)) : posts
</script>

<PageHead description="Polyglot blog about philosophy, linguistics, and spirituality." />

<p>
  Hi, my name is Jackson Holiday Wheeler. Welcome to my blog about philosophy, linguistics, and
  spirituality.
</p>

{#each filteredPosts as { slug, title, description, tags, languages, date }}
  <article>
    <ArticleTitle {slug} {title} />
    <ArticleDescription {description} {slug} />
    <ArticleMeta {tags} {date} {languages} />
  </article>
{/each}

<slot />

<style>
  article {
    margin-bottom: calc(var(--spacing-unit) * 8);
  }
</style>
