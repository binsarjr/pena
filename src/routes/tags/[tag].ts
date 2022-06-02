import PageRepository from '../../app/repositories/PageRepository';
import PageService from '../../app/service/PageService';
import type { IPenaList } from '../../components/pena/Types';
import notion, { NotionConfig } from '../../notion';

export const get = async (e: { params: { tag: string } }) => {
	const pageRepository = new PageRepository(NotionConfig.PENAID(), notion);
	const pageService = new PageService(pageRepository);
	const tag = e.params.tag;
	const pena: IPenaList[] = await pageService.Find([tag]);

	return {
		body: {
			pena,
			tag
		}
	};
};
