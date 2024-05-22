<script lang="ts">
  import { page } from '$app/stores';
  import ArticleMeta from '$lib/components/ArticleMeta.svelte';

  export let data;

  $: tag = $page.url.searchParams.get('tag');
  $: filteredPosts =
    tag && data?.posts?.length
      ? data?.posts?.filter((p) => p.tags.includes(tag))
      : data?.posts || [];
</script>

<div class="p-4 md:p-8 flex flex-col items-center">
  <header class="mb-6 lg:mb-8 lg:max-w-xl flex flex-col items-start w-full">
    <a href="/">
      <h1 class="text-3xl/relaxed">Fluid Language</h1>
    </a>
    <p class="text-sm">Hi, my name is Jackson Holiday Wheeler.</p>
    <p class="text-sm">Here I write about philosophy, linguistics, and spirituality.</p>
  </header>

  <main class="flex flex-col gap-6 lg:max-w-xl w-full">
    {#each filteredPosts as { slug, title, description, tags, languages, date }}
      <a href={`posts/${slug}`}>
        <article class="flex flex-col gap-6 bg-slate-800 p-4 rounded-sm w-full">
          <div class="w-fit lg:max-w-sm">
            <h3 class="text-xl" id={slug}>{title}</h3>
            <span class="text-sm">{description}</span>
          </div>

          <ArticleMeta {tags} {date} {languages} />
        </article>
      </a>
    {/each}
  </main>
</div>
