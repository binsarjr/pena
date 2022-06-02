import PageRepository from '../app/repositories/PageRepository';
import PageService from '../app/service/PageService';
import notion, { NotionConfig } from '../notion';

export const get = async (e: { params: { slug: string } }) => {
	const slug = e.params.slug.match(
		/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
	);
	if (!slug?.length) {
		return { status: 404 };
	}
	const pageId = slug[0];
	const pageRepository = new PageRepository(NotionConfig.PENAID(), notion);
	const pageService = new PageService(pageRepository);
	const pageDetail = await pageService.FindOne(pageId);
	if (!pageDetail)
		return {
			status: 404
		};
	return {
		body: { pageDetail }
	};
};
