<script>
  export let date;

  const formattedDate = new Date(date).toDateString();

</script>

<div>
  <p class="date">{formattedDate}</p>
</div>

<style>
  div {
    margin: calc(var(--spacing-unit) * 9) 0;
  }

  p {
    margin: 0;
  }

  .date {
    color: var(--color-text-secondary);
  }
</style>
