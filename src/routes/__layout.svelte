<script lang="ts">
	import Container from '../components/Container.svelte';

	import '../app.css';
	import Nav from './../components/Nav.svelte';

	const backlinks: (
		| string
		| {
				title: string;
				link: string;
				targetBlank?: boolean;
		  }
	)[] = [
		{
			title: '/home',
			link: '/'
		},
		{
			title: 'binsarjr.github.io',
			link: 'https://binsarjr.github.io',
			targetBlank: true
		}
	];

	const socialMedia = [
		{
			link: 'https://www.instagram.com/binsardj/',
			name: 'instagram'
		},
		{
			link: 'https://github.com/binsarjr',
			name: 'github'
		},
		{
			link: 'https://www.linkedin.com/in/binsarjr/',
			name: 'linkedin'
		}
	];
</script>

<Nav />
<Container>
	<slot />
</Container>
<footer class="py-5">
	<section class="float-left">
		{#each socialMedia as { link, name }}
			<a href={link} class="mr-5" target="_blank">{name}</a>
		{/each}
	</section>
	<section class="float-right">
		<div class="flex flex-row">
			{#each backlinks as backlink}
				{#if typeof backlink == 'string'}
					<a class="ml-5" href={backlink}>{backlink}</a>
				{:else if backlink.targetBlank}
					<a href={backlink.link} class="ml-5" target="_blank">{backlink.title}</a>
				{:else}
					<a href={backlink.link} class="ml-5">{backlink.title}</a>
				{/if}
			{/each}
		</div>
	</section>
</footer>

<style lang="scss">
	@import './../styles/colors.scss';
	a {
		color: $secondary;
	}
</style>
