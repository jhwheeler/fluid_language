<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ url, fetch }) {
    const post = await fetch(`${url.pathname}.json`).then(res => res.json());

    if (!post || !post.published) {
      return {
        status: 404,
        error: new Error('Post could not be found')
      };
    }

    return {
      props: {
        post
      }
    };
  }
</script>

<script>
  import PageHead from '$lib/components/PageHead.svelte';
  import ArticleTitle from '$lib/components/ArticleTitle.svelte';
  import ArticleMeta from '$lib/components/ArticleMeta.svelte';

  export let post;

  $: ({ title, description, tags, date, languages } = post);

</script>

<PageHead {title} {description} />

<ArticleTitle {title} />

<slot />

<ArticleMeta {tags} {date} {languages} />
