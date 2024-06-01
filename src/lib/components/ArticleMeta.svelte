<script>
  import { formatDate } from '$lib/utils';

  export let date;
  export let tags;
  export let languages;
</script>

<div class="text-gray-600 lg:max-w-sm cursor-default pointer-events-none">
  {#if tags && tags.length}
    <div class="text-sm flex flex-row gap-1">
      <span>tags:</span>

      {#each tags.split(',') as tag}
        <span>
          <a href={`/?tag=${tag}`}>
            #{tag}
          </a>
        </span>
      {/each}
    </div>
  {/if}

  {#if languages && languages.length}
    <div class="text-sm flex flex-row gap-1">
      <span>languages:</span>

      {#each languages.split(',') as language}
        <span>{language}</span>
      {/each}
    </div>
  {/if}

  <span class="text-xs">{formatDate(date)}</span>
</div>
