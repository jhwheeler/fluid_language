<script lang="ts">
  import ArticleMeta from '$lib/components/ArticleMeta.svelte';
  import type { Post } from '$lib/types';
  import { type ComponentType, onMount } from 'svelte';

  export let post: Post;

  let Component: ComponentType | undefined;

  const { slug, title, description, tags, date, languages, previewComponent } = post;

  onMount(async () => {
    if (previewComponent) {
      Component = (await import(`./${previewComponent}.svelte`)).default;
    }
  });
</script>

<a href={`posts/${slug}`}>
  <article
    class="flex flex-col gap-6 bg-amber-50 p-4 rounded-sm w-full text-slate-800 h-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 hover:bg-opacity-30 transition-opacity transform duration-300"
  >
    <div class="w-fit lg:max-w-sm">
      <h3 class="text-xl" id={slug}>{title}</h3>
      <span class="text-sm">{description}</span>
    </div>

    <ArticleMeta {tags} {date} {languages} />

    {#if previewComponent}
      <svelte:component this={Component} />
    {/if}
  </article>
</a>
