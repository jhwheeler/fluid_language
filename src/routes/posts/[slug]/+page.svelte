<script lang="ts">
  import ArticleMeta from '$lib/components/ArticleMeta.svelte';

  export let data;
</script>

<svelte:head>
  <title>{data.metadata.title}</title>
</svelte:head>

<div class="w-full flex justify-center p-4 md:p-8">
  <article class="lg:max-w-xl lg:w-fit w-full flex flex-col gap-4">
    <header>
      <h1 class="text-3xl/tight">{data.metadata.title}</h1>
    </header>

    <main>
      <svelte:component this={data.content} />
    </main>

    <footer class="mt-6 flex flex-col gap-3">
      <ArticleMeta {...data.metadata} />

      <a href="/" class="text-sm/4">&larr; Back</a>
    </footer>
  </article>
</div>
