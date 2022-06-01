<script lang="ts">
	import { fly } from 'svelte/transition';

	import type { IPenaList } from './Types';

	export let pena: IPenaList[] = [];
</script>

{#each pena as { title, link, updated_at }, i}
	<section class="mt-5" in:fly={{ delay: 100 * i, x: 300 }}>
		<a href={link} class="hover:opacity-75">
			<h2>{title}</h2>
			<p class="text-sm text-gray-500">{updated_at}</p>
		</a>
	</section>
{/each}
