<script>
  export let date;
  export let tags;
  export let languages;

  const formattedDate = new Date(date).toDateString();

</script>

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

<p class="date">{formattedDate}</p>

<style>
  .tags {
    margin-top: 1rem;
  }

  .tags a {
    font-weight: 500;
  }

  .date {
    margin: 1rem 0 calc(var(--spacing-unit) * 9) 0;
    color: var(--color-text-secondary);
  }
</style>
