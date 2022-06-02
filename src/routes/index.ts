import slugify from '../supports/str/slugify';
import type { IPenaList } from '../components/pena/Types';
import PageRepository from '../app/repositories/PageRepository';

import PageService from '../app/service/PageService';
import notion, { NotionConfig } from '../notion';

export const get = async () => {
	const pageRepository = new PageRepository(NotionConfig.PENAID(), notion);
	const pageService = new PageService(pageRepository);

	const pena: IPenaList[] = await pageService.Find();

	return {
		body: {
			pena
		}
	};
};
