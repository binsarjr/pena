<script lang="ts">
	export let prefix = '#';
	export let tagName: string;
	export let link: string;
</script>

<a href={link} class="hover:opacity-75 tag">{prefix}{tagName}</a>

<style lang="scss">
	@import '../styles/colors.scss';
	.tag {
		background: $deepChampagne;
		padding: 0.3rem 0.5rem;
		border-radius: 5px;
		margin: 0 0.3rem;
	}
</style>
