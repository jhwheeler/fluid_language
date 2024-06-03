<script lang="ts">
  import ArticlePreview from '$lib/components/ArticlePreview.svelte';
  import { hasSeenIndexPageAnimations } from '$lib/stores';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  export let data;

  let showAnimations: boolean | null = null;

  $: tag = $page.url.searchParams.get('tag');
  $: filteredPosts =
    tag && data?.posts?.length
      ? data?.posts?.filter((p) => p.tags.includes(tag))
      : data?.posts || [];

  onMount(() => {
    // Hide animations if the user has seen them already or has set the `hideAnimations` query param to true
    showAnimations =
      !$hasSeenIndexPageAnimations && $page.url.searchParams.get('hideAnimations') !== 'true';
    hasSeenIndexPageAnimations.set(true);
  });
</script>

<main
  class="p-4 md:p-8 flex flex-col items-center w-full h-dvh overflow-y-auto bg-gradient-to-b from-sea to-sand"
>
  {#if showAnimations !== null}
    <header class="mb-6 lg:mb-8 flex flex-col items-center w-full justify-center gap-4 text-center">
      <h1 class="text-4xl uppercase bg-clip-text text-transparent bg-cover" class:showAnimations>
        Fluid Language
      </h1>

      <div class="subheader">
        <h2 class="text-sm" class:showAnimations>Hi, my name is Jackson Holiday Wheeler</h2>
        <h2 class="text-sm" class:showAnimations>
          Here I write about philosophy, linguistics, and spirituality
        </h2>
      </div>
    </header>

    <section
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full"
      class:showAnimations
    >
      {#each filteredPosts as post}
        <ArticlePreview {post} />
      {/each}
    </section>
  {/if}
</main>

<style>
  h1 {
    background-image: url(https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGU5YjZzbGNobHFwd2xmaHQ0ZHJwbWVtMWpvdG5oYXRldW03ZjR3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8rEiAAlQD9gOxarV2B/giphy-downsized-large.gif);
  }

  h1.showAnimations {
    animation: 9s 1 ease fadeInSlideUp;
  }

  .subheader > .showAnimations:first-child {
    animation: 12s 1 normal delayedFadeIn;
  }

  .subheader > .showAnimations:last-child {
    animation: 14s 1 normal delayedFadeIn;
  }

  section.showAnimations {
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
