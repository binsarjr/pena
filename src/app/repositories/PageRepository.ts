import { Notion } from './../../notion';
import type { Client } from "@notionhq/client";
import type { PageEntity } from "../entity/PageEntity";
import moment from 'moment';
import type { PageOneResponse } from '../entity/model/PageOneResponse';

export default class PageRepository {
    constructor(protected database_id: string, protected client: Client) { }
    async Find() {
        const { results, has_more, next_cursor } = await this.client.databases.query({
            database_id: this.database_id
        })
        const endResult: PageEntity[] = results.map((res: { [key: string]: any }) => {
            return {
                title: res['properties']['title']['title'][0]['text']['content'],
                tags: res['properties']['tags']['multi_select'].map((d:{name:string})=> d.name),
                pageId: res['id'],
                createdAt: res['created_time'],
                updatedAt: res['last_edited_time'],
            }
        })
        return { data: endResult, has_more, next_cursor }
    }

    async FindOne(pageId: string):Promise<PageOneResponse> {
        const page: { [i: string]: any } = await this.client.pages.retrieve({ page_id: pageId })

        const blocks = await this.client.blocks.children.list({ block_id: pageId })
        let contents: string[] = []
        for (const block of blocks.results) {

            contents.push(Notion.Render(block))
        }
        const title = Notion.RenderText(page['properties']['title']['title']).replace(/^<p/i, '<h1').replace(/\/p>$/i, '/h1>')
        const tags = page['properties']['tags']['multi_select'].map((d:{name:string})=> d.name)
        return {
            title,
            tags,
            updatedAt: moment(page['last_edited_time']).add(7,'hours').locale('id').format('Do MMMM YYYY'),
            body: contents.join('\n'),
        }

    }
}