import { Notion } from './../../notion';
import type { Client } from '@notionhq/client';
import type { PageEntity } from '../entity/PageEntity';
import moment from 'moment';
import type { PageOneResponse } from '../entity/model/PageOneResponse';
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

export default class PageRepository {
	constructor(protected database_id: string, protected client: Client) {}
	async Find(tags: string[] = []) {
		let parameters: QueryDatabaseParameters = {
			database_id: this.database_id,
			filter: {
				property: 'title',
				title: {
					is_not_empty: true
				},
				and: [
					{
						property: 'hide',
						checkbox: {
							equals: false
						}
					}
				]
			}
		};
		if (tags.length) {
			// @ts-ignore
			parameters.filter.and.push({
				or: tags.map((tag) => ({
					property: 'tags',
					multi_select: {
						contains: tag
					}
				}))
			});
		}
		const { results, has_more, next_cursor } = await this.client.databases.query(parameters);
		const endResult: PageEntity[] = results.map((res: { [key: string]: any }) => {
			return {
				title: res['properties']['title']['title'][0]['text']['content'],
				tags: res['properties']['tags']['multi_select'].map((d: { name: string }) => d.name),
				pageId: res['id'],
				createdAt: res['created_time'],
				updatedAt: res['last_edited_time']
			};
		});
		return { data: endResult, has_more, next_cursor };
	}

	async Tags() {
		const page = await this.client.databases.retrieve({ database_id: this.database_id });
		const $tags = page.properties.tags;
		const tags: string[] = [];
		if ($tags.type == 'multi_select') {
			$tags.multi_select.options.map((d) => {
				tags.push(d.name);
			});
		}
		return tags;
	}

	async FindOne(pageId: string): Promise<PageOneResponse | null> {
		const page: { [i: string]: any } = await this.client.pages.retrieve({ page_id: pageId });
		if (page['properties']['hide']['checkbox']) return null;

		const blocks = await this.client.blocks.children.list({ block_id: pageId });
		let contents: string[] = [];
		for (const block of blocks.results) {
			contents.push(Notion.Render(block));
		}
		const title = Notion.RenderText(page['properties']['title']['title'])
			.replace(/^<p/i, '<h1')
			.replace(/\/p>$/i, '/h1>');
		const tags = page['properties']['tags']['multi_select'].map((d: { name: string }) => d.name);
		return {
			title,
			tags,
			updatedAt: moment(page['last_edited_time'])
				.add(7, 'hours')
				.locale('id')
				.format('Do MMMM YYYY'),
			body: contents.join('\n')
		};
	}
}
