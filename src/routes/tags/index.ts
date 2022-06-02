import notion, { NotionConfig } from './../../notion';
import PageRepository from '../../app/repositories/PageRepository';
import PageService from '../../app/service/PageService';

export const get = async () => {
	const pageRepository = new PageRepository(NotionConfig.PENAID(), notion);
	const pageService = new PageService(pageRepository);
	let tags = await pageService.Tags();
	return {
		body: {
			tags
		}
	};
};
