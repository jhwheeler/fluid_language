<script>
  export let date;
  export let tags;

  const formattedDate = new Date(date).toDateString();

</script>

<div class="tags">
  <span>tags: </span>
  {#each tags.split(',') as tag}
    <span>#{tag} </span>
  {/each}
</div>


<p class="date">{formattedDate}</p>

<style>
  .tags {
    margin-top: 1rem;
  }

  .date {
    margin: 1rem 0 calc(var(--spacing-unit) * 9) 0;
    color: var(--color-text-secondary);
  }
</style>
