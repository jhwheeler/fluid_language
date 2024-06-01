<script lang="ts">
  import { page } from '$app/stores';
  import ArticleMeta from '$lib/components/ArticleMeta.svelte';

  export let data;

  $: console.log(data);

  $: tag = $page.url.searchParams.get('tag');
  $: filteredPosts =
    tag && data?.posts?.length
      ? data?.posts?.filter((p) => p.tags.includes(tag))
      : data?.posts || [];
</script>

<main class="p-4 md:p-8 flex flex-col items-center w-full h-dvh overflow-y-auto">
  <header class="mb-6 lg:mb-8 flex flex-col items-center w-full justify-center gap-4 text-center">
    <h1 class="text-4xl uppercase bg-clip-text text-transparent bg-cover">Fluid Language</h1>

    <div class="subheader">
      <h2 class="text-sm">Hi, my name is Jackson Holiday Wheeler</h2>
      <h2 class="text-sm">Here I write about philosophy, linguistics, and spirituality</h2>
    </div>
  </header>

  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full">
    {#each filteredPosts as { slug, title, description, tags, languages, date }}
      <a href={`posts/${slug}`}>
        <article
          class="flex flex-col gap-6 bg-amber-50 p-4 rounded-sm w-full text-slate-600 h-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 hover:bg-opacity-30 transition-opacity transform duration-300"
        >
          <div class="w-fit lg:max-w-sm">
            <h3 class="text-xl" id={slug}>{title}</h3>
            <span class="text-sm">{description}</span>
          </div>

          <ArticleMeta {tags} {date} {languages} />
        </article>
      </a>
    {/each}
  </section>
</main>

<style>
  :root {
    --teal: #0095ba;
    --sand: #f5f5dc;
  }

  main {
    background: linear-gradient(var(--teal), var(--sand));
  }

  h1 {
    background-image: url(https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGU5YjZzbGNobHFwd2xmaHQ0ZHJwbWVtMWpvdG5oYXRldW03ZjR3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8rEiAAlQD9gOxarV2B/giphy-downsized-large.gif);
    animation: 9s 1 ease fadeInSlideUp;
  }

  .subheader > :first-child {
    animation: 12s 1 normal delayedFadeIn;
  }

  .subheader > :last-child {
    animation: 14s 1 normal delayedFadeIn;
  }

  section {
    animation: 16s 1 normal delayedFadeIn;
  }

  @keyframes fadeInSlideUp {
    0% {
      transform: translateY(30dvh);
      opacity: 0;
    }
    33% {
      transform: translateY(30dvh);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes delayedFadeIn {
    0% {
      opacity: 0;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
