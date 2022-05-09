<script lang="ts">
	import type { NavProps } from './Nav';
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

	let navigations: NavProps[] = [
		{
			title: 'Pena',
			link: '/'
		}
	];
	$: visible = false;
	$: {
		if (navigations.length > 1) navigations = [navigations[0]];
		let lastpath = '';

		for (const path of $page.url.pathname.split('/').filter(Boolean)) {
			lastpath += '/' + path;

			navigations[navigations.length] = {
				title: path,
				link: lastpath
			};
		}
	}
	onMount(() => (visible = true));
</script>

{#if visible}
	<nav id="navbread">
		<ul class="flex">
			{#each navigations as { title, link }, i}
				<li in:fly={{ x: -50, delay: 100 * i }}>
					<a href={link}>{title}</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style lang="scss" global>
	@import './../styles/colors.scss';
	$padnav: 0.5625rem;
	$divider: '/';
	#navbread {
		ul {
			li {
				&:not(:first-child) {
					padding-left: $padnav;
				}
				a {
					position: relative;
					text-decoration: none;
					color: $secondary;
					&::before {
						position: absolute;
						bottom: 0;
						left: 0;
						content: '';
						width: 100%;
						height: 0.0625rem;
						background-color: currentColor;
						transform: scaleX(0);
						transition: 0.3s;
					}
					&:hover::before {
						transform: scaleX(1);
					}
				}
				&:not(:first-child)::before {
					content: $divider;
					padding-right: $padnav;
					color: $secondary;
				}
				&:last-child a {
					color: $primary;
				}
			}
		}
	}
</style>
