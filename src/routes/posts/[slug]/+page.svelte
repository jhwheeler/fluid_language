<script lang="ts">
  import ArticleMeta from '$lib/components/ArticleMeta.svelte';

  export let data;
</script>

<svelte:head>
  <title>{data.metadata.title}</title>
</svelte:head>

<main
  class="w-full flex justify-center p-4 md:p-8 bg-gradient-to-b from-sea to-sand min-h-dvh overflow-y-auto"
>
  <article class="lg:max-w-xl lg:w-fit w-full flex flex-col gap-4">
    <header>
      <h1 class="text-3xl/tight">{data.metadata.title}</h1>
      {#if data.metadata.source === 'substack' && data.metadata.substackUrl}
        <a
          href={data.metadata.substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-sea hover:underline"
        >
          Also on Substack &rarr;
        </a>
      {/if}
    </header>

    <main>
      {#if data.content}
        <svelte:component this={data.content} />
      {:else if data.htmlContent}
        <div class="substack-content">
          {@html data.htmlContent}
        </div>
      {/if}
    </main>

    <footer class="mt-6 flex flex-col gap-3">
      <ArticleMeta {...data.metadata} />

      <a href="/" class="text-sm/4">&larr; Back</a>
    </footer>
  </article>
</main>

<style>
  .substack-content :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: 0.25rem;
  }

  .substack-content :global(a) {
    color: #0095ba;
    text-decoration: underline;
  }

  .substack-content :global(blockquote) {
    border-left: 3px solid #0095ba;
    padding-left: 1rem;
    margin-left: 0;
    font-style: italic;
    opacity: 0.85;
  }

  .substack-content :global(h2),
  .substack-content :global(h3) {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .substack-content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
  }
</style>
