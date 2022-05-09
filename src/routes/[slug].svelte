<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Tag from '../components/Tag.svelte';
	$: slug = $page.params.slug;
	$: visible = false;
	onMount(() => (visible = true));
	let title = 'Kendalikan semuanya';
</script>

<section class="md:px-20">
	<center>
		<h1 class="text-xl sm:text-2xl md:text-3xl font-semibold">{title}</h1>
		<p class="text-gray-500 text-lg">@binsar / 20 mei 2022</p>
		<section class="flex justify-center mt-5">
			<Tag tagName="hidup" link="/tags/hidup" />
			<Tag tagName="motivasi" link="/tags/motivasi" />
		</section>
	</center>
	{#if visible}
		<section in:fade class="my-10 md:my-20">
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus labore saepe nobis fugit
				dolorem officiis dolore voluptatem nulla quibusdam amet facere corrupti voluptates aut ex,
				tenetur, facilis nostrum quos reprehenderit!
			</p>
			<br />
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus labore saepe nobis fugit
				dolorem officiis dolore voluptatem nulla quibusdam amet facere corrupti voluptates aut ex,
				tenetur, facilis nostrum quos reprehenderit!
			</p>
		</section>
	{/if}
</section>
