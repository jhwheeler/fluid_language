<script>
	export let description;
	export let slug = '';

	const href = slug && `/posts/${slug}`;

</script>

<div class="description">
	<p class="text">{description}</p>

	<p>
		{#if slug}
			<a {href}>Read &rarr;</a>
		{/if}
	</p>
</div>

<style>
	.description {
		margin-top: 0.2rem;
	}

	p {
		margin: 0;
	}
</style>
