<script>
  export let date;
  export let tags;
  export let languages;

  const formattedDate = new Date(date).toDateString();

</script>

<div class="meta">
  <p class="date">{formattedDate}</p>

  {#if tags && tags.length}
    <div class="list tags">
      <span>tags: </span>
      {#each tags.split(',') as tag}
        <span><a href={`/?tag=${tag}`}>#{tag}</a> </span>
      {/each}
    </div>
  {/if}

  {#if languages && languages.length}
    <div class="languages">
      <span>languages: </span>
      {#each languages.split(',') as language}
        <span>{language} </span>
      {/each}
    </div>
  {/if}
</div>

<style>
  .meta {
    margin-bottom: 3rem;
  }

  .tags {
    margin-top: 0.5rem;
  }

  .tags a {
    font-weight: 500;
  }

  .date {
    margin-top: 1.5rem;
    color: var(--color-text-secondary);
  }
</style>
