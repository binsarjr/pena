<script lang="ts">
	import { page } from '$app/stores';
	import PenaList from '../../components/pena/PenaList.svelte';
	import type { IPenaList } from '../../components/pena/Types';
	import slugify from '../../supports/str/slugify';

	$: tag = $page.params.tag;

	const pena: IPenaList[] = [
		{
			title: 'kendalikan semuanya',
			updated_at: '20 mei 2022',
			link: '/dunia-ini-ada-batasnya'
		},
		{
			title: 'Menemukan jalan diambang kematian',
			updated_at: '20 mei 2022',
			link: '/dunia-ini-ada-batasnya1'
		},
		{
			title: 'Untukmu yang berjasa kepadaku',
			updated_at: '20 mei 2022',
			link: '/dunia-ini-ada-batasnya2'
		},
		{
			title: 'Untuk diirku dimasa mendatang',
			updated_at: '20 mei 2022',
			link: '/dunia-ini-ada-batasnya3'
		},
		{
			title: 'Untuk diriku dimasa lalu',
			updated_at: '20 mei 2022',
			link: '/dunia-ini-ada-batasnya4'
		}
	].map((p) => {
		p.link = "/"+slugify(p.title);
		return p;
	});
</script>

<section class="mt-12 text-xl md:text-2xl">
  <h1 class="inline-flex font-semibold">Tag: {tag}</h1>
</section>
<span style="background:#E07A5F;" class="w-32  my-5 p-[1px] rounded" />

<section class="my-12">
	<PenaList {pena} />
</section>
