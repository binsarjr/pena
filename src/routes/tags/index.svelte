<script lang="ts">
	import Tag from '../../components/Tag.svelte';
	import Container from '../../components/Container.svelte';
	let tags: {
		tagName: string;
		link: string;
		prefix?: string;
	}[] = [
		{
			tagName: 'hidup',
			link: '/tags/hidup'
		},
		{
			tagName: 'motivasi',
			link: '/tags/motivasi'
		}
	];
</script>

<section class="mt-12 text-xl md:text-2xl">
	<h1 class="inline-flex font-semibold">Tags</h1>
</section>
<span style="background:#E07A5F;" class="w-32  my-5 p-[1px] rounded" />
<Container>
	<section class="flex">
		{#each tags as { tagName, link }}
			<Tag {tagName} {link} />
		{/each}
	</section>
</Container>
