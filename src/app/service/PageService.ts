import moment from 'moment';
import type { IPenaList } from '../../components/pena/Types';
import slugify from '../../supports/str/slugify';
import type PageRepository from '../repositories/PageRepository';

moment.locale('id');

export default class PageService {
	constructor(protected repository: PageRepository) {}
	async Find(tags: string[] = []) {
		const pages = await this.repository.Find(tags);

		const results: IPenaList[] = pages.data.map((page) => {
			return {
				title: page.title,
				updated_at: moment(page.updatedAt).add(7, 'hours').format('Do MMMM YYYY, h:mm:ss a'),
				link: '/' + slugify(page.title) + '-' + page.pageId
			};
		});
		return results;
	}
	async FindOne(pageId: string) {
		return this.repository.FindOne(pageId);
	}
	async Tags() {
		const tags = await this.repository.Tags();
		tags.sort();
		return tags.map((tag) => ({
			tagName: tag,
			link: '/tags/' + tag
		}));
	}
}
