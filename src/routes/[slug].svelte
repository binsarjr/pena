<script lang="ts">
	import type { PageOneResponse } from 'src/app/entity/model/PageOneResponse';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Tag from '../components/Tag.svelte';
	export let pageDetail: PageOneResponse;
	let visible = false;
	onMount(() => (visible = true));
</script>

<section class="md:px-20">
	<center>
		<h1 class="text-xl sm:text-2xl md:text-3xl font-semibold">{@html pageDetail.title}</h1>
		<p class="text-gray-500 text-lg">@binsar / {@html pageDetail.updatedAt}</p>
		<section class="flex justify-center mt-5">
			{#each pageDetail.tags as tag}
				<Tag tagName="{tag}" link="/tags/{tag}" />
			{/each}
		</section>
	</center>
	{#if visible}
		<section in:fade class="my-10 md:my-20 flex flex-col gap-2">
			{@html pageDetail.body}
		</section>
	{/if}
</section>
