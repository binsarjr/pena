<script lang="ts">
	import PenaList from '../components/pena/PenaList.svelte';
	import type { IPenaList } from '../components/pena/Types';
	
	const name = 'Binsar Dwi Jasuma';
	const summary = 'Suka menulis hal apapun yang terlintas dalam pikiran.';

	export let pena: IPenaList[]
</script>

<section class="mt-12 text-xl md:text-2xl">
	<h1 class="inline-flex font-semibold">Hai! Saya {name}</h1>
	<p>{summary}</p>
</section>
<span style="background:#E07A5F;" class="w-32  my-5 p-[1px] rounded" />

<section class="my-12">
	<PenaList {pena} />
</section>
