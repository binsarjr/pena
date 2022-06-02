import { Client } from '@notionhq/client';
interface RichText {
	type: 'text' | string;
	text: { content: string; link?: string };
	annotations: {
		bold: boolean;
		italic: boolean;
		strikethrough: boolean;
		underline: boolean;
		code: boolean;
		color: 'default' | string;
	};
	plain_text: string;
	href?: string;
}
interface Image {
	object: 'block' | string;
	id: string;
	created_time: string;
	last_edited_time: string;
	created_by: {
		object: string;
		id: string;
	};
	last_edited_by: {
		object: string;
		id: string;
	};
	has_children: boolean;
	archived: boolean;
	type: 'image' | string;
	image: {
		caption: string[];
		type: 'file' | string;
		file: {
			url: string;
			expiry_time: string;
		};
		external?: {
			url?: string;
		};
	};
}
export class Notion {
	private contents: string[] = [];
	constructor(private block: { [i: string]: any }) {}

	html() {
		const procs: { [i: string]: Function } = {
			paragraph: () => this.paragraph(),
			heading_1: () => this.heading(1),
			heading_2: () => this.heading(2),
			heading_3: () => this.heading(3),
			heading_4: () => this.heading(4),
			heading_5: () => this.heading(5),
			heading_6: () => this.heading(6),
			text: () => Notion.RenderText(this.block as any),
			image: () => this.image()
		};
		const errBlock = Object.keys(procs).includes(this.block['type'])
			? procs[this.block['type']]()
			: new Error('Tidak ada handler untuk ' + this.block['type']);
		if (errBlock instanceof Error) throw errBlock;
		return this.contents.join('\n');
	}
	private image() {
		const imageBlock: Image = this.block as Image;

		const url = imageBlock.image?.file?.url || imageBlock.image?.external?.url;
		const caption = Notion.RenderText(imageBlock.image.caption as any);
		this.contents.push(`
            <div class="flex flex-col mx-auto w-full md:w-1/2 self-center">
                <img src="${url}" class="rounded" alt="${url}" />
                <p>${caption}</p>
            </div>
        `);
	}
	private heading(heading: number) {
		const h: { [i: number]: string } = {
			1: 'h1',
			2: 'h2',
			3: 'h3',
			4: 'h4',
			5: 'h5',
			6: 'h6'
		};
		const headClass: { [i: number]: string } = {
			1: 'text-3xl',
			2: 'text-2xl',
			3: 'text-xl',
			4: 'text-lg',
			5: 'text-md',
			6: 'text-sm'
		};
		const headingTag = h[heading];
		const headingClass = headClass[heading];
		const richtTexts: RichText[] = this.block['heading_' + heading]['rich_text'];
		let contents = '';
		for (const richtText of richtTexts) {
			let content = richtText.plain_text;

			if (richtText?.annotations?.code) {
				content = `<pre>${content}</pre>`;
				return;
			}
			if (richtText?.annotations?.bold) content = `<b class="font-bold">${content}</b>`;
			if (richtText?.annotations?.italic) content = `<i>${content}</i>`;
			if (richtText?.annotations?.underline) content = `<u>${content}</u>`;
			if (richtText?.annotations?.strikethrough) content = `<s>${content}</s>`;
			if (richtText?.annotations?.color != 'default') {
				content = `<font color="${richtText.annotations.color}">${content}</font>`;
			}
			contents += content;
		}
		this.contents.push(`<${headingTag} class="${headingClass}">${contents}</${headingTag}>`);
	}

	private paragraph() {
		const richtTexts: RichText[] = this.block['paragraph']['rich_text'];
		let contents = '';
		for (const richtText of richtTexts) {
			let content = richtText.plain_text;

			if (richtText?.annotations?.code) {
				content = `<pre>${content}</pre>`;
				continue;
			}
			if (richtText?.annotations?.bold) content = `<b class="font-bold">${content}</b>`;
			if (richtText?.annotations?.italic) content = `<i>${content}</i>`;
			if (richtText?.annotations?.underline) content = `<u>${content}</u>`;
			if (richtText?.annotations?.strikethrough) content = `<s>${content}</s>`;
			if (richtText?.annotations?.color != 'default') {
				content = `<font color="${richtText.annotations.color}">${content}</font>`;
			}
			if (richtText.href) {
				content = `<a href="${richtText.href}" class="text-blue-500 hover:text-blue-800">${content}</a>`;
			}
			contents += content;
		}
		this.contents.push(`<p>${contents}</p>`);
	}
	static RenderText(blocks: { [i: string]: any }[]) {
		let contents = ['<p>'];
		for (const block of blocks) {
			let content = block.plain_text;

			if (block?.annotations?.code) {
				content = `<pre>${content}</pre>`;
				continue;
			}
			if (block?.annotations?.bold) content = `<b class="font-bold">${content}</b>`;
			if (block?.annotations?.italic) content = `<i>${content}</i>`;
			if (block?.annotations?.underline) content = `<u>${content}</u>`;
			if (block?.annotations?.strikethrough) content = `<s>${content}</s>`;
			if (block?.annotations?.color != 'default') {
				content = `<font color="${block.annotations.color}">${content}</font>`;
			}
			contents.push(content);
		}
		contents.push('</p>');
		return contents.join('');
	}
	static Render(block: { [i: string]: any }) {
		const notion = new Notion(block);
		return notion.html();
	}
}

export const NotionConfig = {
	PENAID: () => process.env.PENAID!
};

export default new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
