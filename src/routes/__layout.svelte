<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import '../app.css';
	import Container from '../components/Container.svelte';
	import Nav from './../components/Nav.svelte';
	import Sign from '../components/sign.svelte';

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
	let showLoading = true;

	afterNavigate(() => {
		setTimeout(() => (showLoading = false), 4000);
	});
</script>

{#if showLoading}
	<Sign />
{/if}

<Nav />
<Container>
	<slot />
</Container>
<footer class="py-5">
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
